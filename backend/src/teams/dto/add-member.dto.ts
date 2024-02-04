import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Team } from '../entities/team.entity';

export class AddMemberDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  teamId: Team; 
}
