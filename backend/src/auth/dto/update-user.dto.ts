import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { Team } from 'src/teams/entities/team.entity';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  @MinLength(6)
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  fullName?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(150)
  picture?: string;

  @IsEnum(ValidRoles)
  @IsOptional()
  roles?: ValidRoles;

  @IsUUID()
  @IsString()
  team: Team;
}
