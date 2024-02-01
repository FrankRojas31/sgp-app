import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'material_resource' })
export class MaterialResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  description: string;

  @Column('int', {
    default: 0,
  })
  quantity_available: number;

  @ManyToMany(() => Project, (project) => project.materialResource)
  projects: Project[];
}
