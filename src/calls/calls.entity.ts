import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scheduled_calls')
export class ScheduledCall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  toPhone: string;

  @Column()
  audioUrl: string;

  @Column()
  callAt: Date;
}
