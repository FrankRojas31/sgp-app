import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @OneToOne(() => Team, (team) => team.project, { eager: true })
  @JoinColumn()
  team: Team;
}
