import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Superpower } from 'modules/superpowers/superpower.entity';
import { Picture } from 'modules/Picture/Picture.entity';

@Entity({ name: 'superhero' })
export class Superhero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  nickname: string;

  @Column({
    nullable: false,
  })
  real_name: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  catch_phrase: string;

  @Column({
    nullable: false,
  })
  reference_image: string;

  @OneToMany(() => Picture, (picture) => picture.superhero)
  pictures: Picture[]

  @ManyToMany(() => Superpower)
  @JoinTable()
  superpowers: Superpower[];
}