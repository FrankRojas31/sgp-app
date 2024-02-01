import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { MaterialResource } from './entities/material-resource.entity';
import { HumanResource } from './entities/human-resource.entity';

@Module({
  controllers: [ResourcesController],
  providers: [ResourcesService],
  imports: [
    TypeOrmModule.forFeature([Project, MaterialResource, HumanResource]),
  ],
})
export class ResourcesModule {}
