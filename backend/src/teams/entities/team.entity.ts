import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => User, (user) => user.team, { eager: true })
  members: User[];

  @OneToOne(() => Project, (project) => project.team)
  project: Project
}
