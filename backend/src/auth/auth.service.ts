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
import { Permission } from './entities/permissions.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionToUserDto } from './dto/assign-permission-user.dto';

import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly PermissionRepository: Repository<Permission>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'SGP_APP', secret);
    await this.setTwoFactorAuthenticationSecret(secret, user.id);

    const QR = this.generateQrCodeDataURL(otpauthUrl);

    console.log(QR);

    return QR;
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
    const userfind = await this.userRepository.preload({
      id: userId,
      twoFactorAuthenticationSecret: secret,
    });
    if (!userfind) throw new NotFoundException('User not found');
    return await this.userRepository.save(userfind);
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    const qrCodeDataURL = await qrcode.toDataURL(otpAuthUrl);
    return qrCodeDataURL;
  }

  async turnOnTwoFactorAuthentication(userId: string) {
    return this.userRepository.update(
      { id: userId },
      { isTwoFactorAuthenticationEnabled: true },
    );
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: User,
  ) {
    const result = authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });

    return result;
  }

  async loginWith2fa(userWithoutPsw: Partial<User>) {
    const payload = {
      email: userWithoutPsw.email,
      isTwoFactorAuthenticationEnabled:
        !!userWithoutPsw.isTwoFactorAuthenticationEnabled,
      isTwoFactorAuthenticated: true,
    };

    return {
      ...userWithoutPsw,
      token: this.jwtService.sign(payload),
      status: true,
    };
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      select: {
        id: true,
        password: true,
        isTwoFactorAuthenticationEnabled: true,
      },
    });

    if (!user) throw new NotFoundException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async activateTwoFactorAuthentication(user: User) {
    return await  this.userRepository.update(
      { id: user.id },
      { isTwoFactorAuthenticationEnabled: true },
    );
  }

  async desactivateTwoFactorAuthentication(user: User) {
    return await this.userRepository.update(
      { id: user.id },
      { isTwoFactorAuthenticationEnabled: false },
    );
  }

  async verifyTwoFactorAuthenticationCode(user: User) {
    const findUser = await this.userRepository.findOne({
      where: { id: user.id },
      select: {
        id: true,
        isTwoFactorAuthenticationEnabled: true,
      },
    });

    if (!findUser) throw new NotFoundException('User not found');

    return findUser.isTwoFactorAuthenticationEnabled;
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        team: true,
        permissions: true,
      },
    });
    const getPermissions: any = user.permissions.map(
      (permission) => permission.name,
    );
    user.permissions = getPermissions;

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllUsers(paginationDto: PaginationDto) {
    const { limit = 30, offset = 0 } = paginationDto;
    const getAllUsers = await this.userRepository.find({
      take: limit,
      skip: offset,
      where: { isActive: true },
      relations: {
        team: true,
        permissions: true,
      },
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
      where: { email, isActive: true },
      select: {
        email: true,
        password: true,
        id: true,
        roles: true,
        isActive: true,
        fullName: true,
        picture: true,
        permissions: true,
      },
      relations: {
        team: true,
      },
    });

    if (!user) throw new NotFoundException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    const getAllPermissionsUser: any = user.permissions.map(
      (permission) => permission.name,
    );
    user.permissions = getAllPermissionsUser;
    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async validatePasswordAdmin(password: string, user: User) {
    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    const isValid = await bcrypt.compare(password, findUser.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');
    return user;
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

  async deleteUser(id: string) {
    const findUser = await this.userRepository.preload({ id, isActive: false });
    if (!findUser) throw new NotFoundException('El usuario no existe');
    return await this.userRepository.save(findUser);
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const permission = this.PermissionRepository.create(createPermissionDto);
    return await this.PermissionRepository.save(permission);
  }

  async getAllPermissions() {
    return this.PermissionRepository.find();
  }

  async assignPermissionToUser(
    assignPermissionToUserDto: AssignPermissionToUserDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: assignPermissionToUserDto.userId },
    });

    if (!user) throw new NotFoundException('User not found!');

    const permission = await this.PermissionRepository.findOne({
      where: { id: assignPermissionToUserDto.permissionId },
    });

    if (!permission) throw new NotFoundException('Permiso no encontrado');

    user.permissions.push(permission);
    return this.userRepository.save(user);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
function toDataURL(otpAuthUrl: string) {
  throw new Error('Function not implemented.');
}
