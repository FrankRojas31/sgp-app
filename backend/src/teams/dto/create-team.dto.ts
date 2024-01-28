import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  members: User[];
}
