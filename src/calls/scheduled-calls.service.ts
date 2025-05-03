import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledCall } from './calls.entity';


@Injectable()
export class ScheduledCallsService {
  constructor(
    @InjectRepository(ScheduledCall)
    private readonly scheduledCallRepo: Repository<ScheduledCall>
  ) {}

  async createSchedule(to: string, audioUrl: string, callAt: Date): Promise<ScheduledCall> {
    const newCall = this.scheduledCallRepo.create({
      toPhone: to,
      audioUrl,
      callAt,
    });

    return await this.scheduledCallRepo.save(newCall);
  }
}
