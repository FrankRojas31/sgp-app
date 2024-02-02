import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class ProjectsService {
  private readonly logger: any;
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { name, teams = [] } = createProjectDto;
    const project = this.projectRepository.create({
      name,
      teams,
    });

    await this.projectRepository.save(project);
    await Promise.all(
      teams.map(async (team: any) => {
        try {
          const findTeam = await this.teamRepository.findOneBy({
            id: team,
          });

          if (findTeam) {
            const updatedTeam = await this.teamRepository.preload({
              id: findTeam.id,
              project,
            });

            if (updatedTeam) {
              return await this.teamRepository.save(updatedTeam);
            }
          }
        } catch (error) {
          this.handleDBErrors(error);
        }
      }),
    );

    return 'Proyecto creado correctamente';
  }

  findAll() {
    return this.projectRepository.find({
      relations: {
        teams: true,
      },
    });
  }

  findOne(id: string) {
    return this.projectRepository.findOneBy({ id });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
    });
    if (!project) throw new NotFoundException(`Project with ${id} not found`);
    return await this.projectRepository.save(project);
  }

  async remove(id: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project)
      throw new NotFoundException(`Project with id ${id} not found`);

    const projectLoad = await this.projectRepository.preload({
      id,
      isActive: false,
    });

    return projectLoad;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
