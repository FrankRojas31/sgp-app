import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger('TeamService');
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    private readonly authService: AuthService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { name, members = [] } = createTeamDto;
    const team = this.teamRepository.create({
      name,
      members,
    });
    await this.teamRepository.save(team);

    await Promise.all(
      members.map(async (member: any) => {
        try {
          const findUser = await this.authService.findUser(member);
          if (findUser) await this.authService.updateUser(member, { team });
        } catch (error) {
          this.handleDBErrors(error);
        }
      }),
    );

    return 'Equipo creado correctamente.';
  }

  findAll() {
    return this.teamRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
