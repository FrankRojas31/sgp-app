import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetHeader, GetUser } from './decorators/index';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  Patch,
  ParseUUIDPipe,
  Delete,
  UnauthorizedException,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionToUserDto } from './dto/assign-permission-user.dto';
import { Jwt2faAuthGuard } from './guards/jwt-2fa-auth.guard';

@ApiTags('Autenticación y usuarios')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth()
  @Post('2fa/turn-on')
  async turnOnTwoFactorAuthentication(
    @GetUser() user: User,
    @Body() body: any,
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      body.twoFactorAuthenticationCode,
      user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.authService.turnOnTwoFactorAuthentication(user.id);
  }

  @Auth()
  @Post('2fa/activate')
  async activateTwoFactorAuthentication(@GetUser() user: User) {
    return this.authService.activateTwoFactorAuthentication(user);
  }

  @Auth()
  @Get('2fa/verify')
  async verifyTwoFactorAuthenticationCode(@GetUser() user: User) {
    return this.authService.verifyTwoFactorAuthenticationCode(user);
  }

  @Auth()
  @Post('2fa/desactivate')
  async desactivateTwoFactorAuthentication(@GetUser() user: User) {
    return this.authService.desactivateTwoFactorAuthentication(user);
  }

  @Auth()
  @Post('2fa/generate')
  async generateTwoFactorAuthenticationSecret(@GetUser() user: User) {
    return this.authService.generateTwoFactorAuthenticationSecret(user);
  }

  @Post('2fa/authenticate')
  @UseGuards(Jwt2faAuthGuard)
  @HttpCode(200)
  async authenticate(@Req() request, @Body() body: any) {
    const isCodeValid =
      await this.authService.isTwoFactorAuthenticationCodeValid(
        body.twoFactorAuthenticationCode,
        request.user,
      );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return this.authService.loginWith2fa(request.user);
  }

  @Post('validate-user')
  validateUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(loginUserDto);
  }

  @Auth(ValidRoles.admin)
  @Get('get-all-users')
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.getAllUsers(paginationDto);
  }

  @Auth(ValidRoles.admin)
  @Get('find-user/:id')
  findUser(@Param('id') id: string) {
    return this.authService.findUser(id);
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Auth(ValidRoles.admin)
  @Patch('update/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Auth(ValidRoles.admin)
  @Delete('delete/:id')
  deleteUser(@Param() id: string) {
    return this.authService.deleteUser(id);
  }

  @Auth(ValidRoles.admin)
  @Get('get-all-permissions')
  getAllPermissions() {
    return this.authService.getAllPermissions();
  }

  @Auth(ValidRoles.admin)
  @Post('create-permission')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.authService.createPermission(createPermissionDto);
  }

  @Auth(ValidRoles.admin)
  @Post('assign-permission-user')
  assignPermissionToUser(
    @Body() assignPermissionToUserDto: AssignPermissionToUserDto,
  ) {
    return this.authService.assignPermissionToUser(assignPermissionToUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetHeader() headers: string[],
  ) {
    return {
      ok: true,
      message: 'This route is private',
      user,
      email,
      headers,
    };
  }

  @Get('private2')
  // @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This route is private',
      user,
    };
  }

  @Get('private3')
  @Auth()
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This route is private',
      user,
    };
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
