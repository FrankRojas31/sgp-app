import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [User], required: false })
  @IsArray()
  @IsOptional()
  members?: User[];
}
