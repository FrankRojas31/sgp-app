import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { AddMemberDto } from './dto/add-member.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger('TeamService');
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { name, members = [], ...rest } = createTeamDto;
    const team = this.teamRepository.create({
      name,
      members,
      ...rest,
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

  getUserTeam(user: User) {
    const findTeamUser = this.teamRepository.findOne({
      where: { members: user },
    });
    if (!findTeamUser)
      throw new NotFoundException(
        `El usuario con el id: ${user.id} no tiene equipo asignado`,
      );
    return findTeamUser;
  }

  findAll() {
    return this.teamRepository.find({ where: { isActive: true } });
  }

  async findOne(id: string) {
    const team = this.teamRepository.findOneBy({ id });
    if (!team)
      throw new NotFoundException(
        `El equipo con el id: ${id} no fue encontrado`,
      );
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.preload({ id, ...updateTeamDto });
    if (!team)
      throw new NotFoundException(
        `El equipo con el id: ${id} no fue encontrado`,
      );
    return await this.teamRepository.save(team);
  }

  async remove(id: string) {
    const team = await this.teamRepository.preload({ id, isActive: false });
    if (!team)
      throw new NotFoundException(
        `El equipo con el id: ${id} no fue encontrado`,
      );
    return await this.teamRepository.save(team);
  }

  async AddMember(addMemberDto: AddMemberDto) {
    const { teamId, userId } = addMemberDto;
    const findUser = await this.userRepository.findOneBy({ id: userId });
    if (!findUser)
      throw new NotFoundException(
        `El usuario con el Id: ${userId} no fue encontrado`,
      );

    const loadMember = await this.userRepository.preload({
      id: userId,
      team: teamId,
    });

    return await this.userRepository.save(loadMember);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
