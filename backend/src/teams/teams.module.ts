import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [TypeOrmModule.forFeature([Team, User]), AuthModule],
})
export class TeamsModule {}
