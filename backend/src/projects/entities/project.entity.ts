import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Team } from 'src/teams/entities/team.entity'; // Asegúrate de que la ruta sea correcta
import { HumanResource } from 'src/resources/entities/human-resource.entity';
import { MaterialResource } from 'src/resources/entities/material-resource.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('date', { nullable: true })
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Team, (team) => team.project, { eager: true })
  teams: Team[];

  @ManyToMany(() => HumanResource, { eager: true })
  @JoinTable()
  humanResource: HumanResource[];

  @ManyToMany(() => MaterialResource, { eager: true })
  @JoinTable()
  materialResource: MaterialResource[];
}
