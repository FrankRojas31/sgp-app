import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';

export class CreateMaterialResourceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  quantity_available: number;

  @IsArray()
  @IsOptional()
  projects: Project[];
}
