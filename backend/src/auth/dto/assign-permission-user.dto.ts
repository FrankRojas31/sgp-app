import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class AssignPermissionToUserDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  permissionId: string;
}
