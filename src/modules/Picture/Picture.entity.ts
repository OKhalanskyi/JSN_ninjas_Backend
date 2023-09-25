import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Superhero } from 'modules/superheroes/superhero.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  url: string

  @ManyToOne(() => Superhero, (superhero) => superhero.pictures)
  superhero: Superhero
}