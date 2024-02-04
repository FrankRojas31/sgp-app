import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
  IsIn,
} from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { validSpecialties } from '../interfaces/valid-specialty.interface';

export class CreateHumanResourceDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  user: User;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsIn(Object.keys(validSpecialties))
  specialty: validSpecialties;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  hoursWorkDaily?: number;

  @ApiProperty({ type: [Project], required: false })
  @IsArray()
  @IsOptional()
  projects?: Project[];
}
