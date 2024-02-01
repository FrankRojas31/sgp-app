import { IsString, IsOptional, IsDateString, IsArray } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsArray()
  @IsOptional()
  teams: Team[]
}
