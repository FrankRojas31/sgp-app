import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetHeader, GetUser } from './decorators/index';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación y usuarios')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-all-users')
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.getAllUsers(paginationDto);
  }

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

  @Patch('update/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
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

  // @SetMetadata('roles', ['member'])
  @Get('private2')
  @RoleProtected(ValidRoles.member, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This route is private',
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
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
