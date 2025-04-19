import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Voice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: string;

  @Column()
  voiceName: string;

  @Column()
  voiceUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
