import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { validSpecialties } from '../interfaces/valid-specialty.interface';

@Entity({ name: 'human_resource' })
export class HumanResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.humanResource, { eager: true })
  user: User;

  @Column('varchar', { nullable: true, default: 'Sin descripción' })
  description: string;

  @Column('varchar')
  specialty: validSpecialties;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  @Column('int', { default: 1 })
  hoursWorkDaily: number;

  @ManyToMany(() => Project, (project) => project.humanResource)
  projects: Project[];
}
