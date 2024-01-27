import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllUsers(paginationDto: PaginationDto) {
    const { limit = 30, offset = 0 } = paginationDto;
    const getAllUsers = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return getAllUsers;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const findUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (findUser) throw new InternalServerErrorException('User already exists');

    try {
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        roles: true,
        isActive: true,
        fullName: true,
        picture: true,
      },
    });

    if (!user) throw new NotFoundException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    const { password, ...restUserUpdate } = updateUser;

    const updatedUser = await this.userRepository.preload({
      id,
      password,
      ...restUserUpdate,
    });

    if (!updatedUser) throw new NotFoundException('User not found');

    if (password) {
      updatedUser.password = bcrypt.hashSync(password, 10);
    }

    return this.userRepository.save(updatedUser);
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
