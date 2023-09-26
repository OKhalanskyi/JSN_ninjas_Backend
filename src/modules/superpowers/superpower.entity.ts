import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'superpower' })
export class Superpower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
  })
  name: string;
}