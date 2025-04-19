import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('scheduled_calls')
export class ScheduledCall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  toPhone: string;

  @Column()
  audioUrl: string;

  @Column({ type: 'timestamp' })
  callAt: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'done' | 'failed';

  @CreateDateColumn()
  createdAt: Date;
}
