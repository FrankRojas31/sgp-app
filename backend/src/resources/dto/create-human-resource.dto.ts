import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { validSpecialties } from '../interfaces/valid-specialty.interface';

export class CreateHumanResourceDto {
  @IsString()
  @IsUUID()
  user: User;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  specialty: validSpecialties;

  @IsNumber()
  @IsOptional()
  hoursWorkDaily: number;

  @IsArray()
  @IsOptional()
  projects: Project[];
}
