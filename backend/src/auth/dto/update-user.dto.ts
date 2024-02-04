import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  @MinLength(6)
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MinLength(1)
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have an Uppercase, lowercase letter, and a number',
  })
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(150)
  picture?: string;

  @ApiProperty({ required: false, enum: ValidRoles })
  @IsEnum(ValidRoles)
  @IsOptional()
  roles?: ValidRoles;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  @IsString()
  team: Team;
}
