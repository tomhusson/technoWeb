import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true }) // Facultatif [cite: 51]
  email?: string;

  @Column({ nullable: true }) // Facultatif [cite: 52]
  photoUrl?: string;
}