import { IsUUID } from 'class-validator';
import { Team } from '../entities/team.entity';

export class AddMemberDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  teamId: Team;
}
