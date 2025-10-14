import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: number;

  @Column('date')
  date: string;
}
