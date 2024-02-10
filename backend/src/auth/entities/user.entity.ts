import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { Team } from 'src/teams/entities/team.entity';
import { HumanResource } from 'src/resources/entities/human-resource.entity';
import { Permission } from './permissions.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fullName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ValidRoles,
    default: ValidRoles.member,
  })
  roles: ValidRoles;

  @Column({
    type: 'varchar',
    default: 'https://acortar.link/MRAY6q',
    length: 255,
  })
  picture: string;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @OneToMany(() => HumanResource, (humanResource) => humanResource.user)
  humanResource: HumanResource;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twoFactorAuthenticationSecret: string;

  @Column({ type: 'boolean', default: false })  
  isTwoFactorAuthenticationEnabled: boolean;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];
  twoFactorSecret: string;



  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsOnUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
