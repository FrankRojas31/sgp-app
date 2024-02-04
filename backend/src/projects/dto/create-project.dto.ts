import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Team } from 'src/teams/entities/team.entity';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, type: Date })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({ required: false, type: Date })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ required: false, type: [Team] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Team)
  teams: Team[];
}
