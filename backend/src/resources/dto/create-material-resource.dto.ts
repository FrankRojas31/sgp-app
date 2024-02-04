import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';

export class CreateMaterialResourceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  quantity_available: number;

  @ApiProperty({ type: [Project], required: false })
  @IsArray()
  @IsOptional()
  projects?: Project[];
}
