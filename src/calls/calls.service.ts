import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledCall } from '../scheduler/scheduled-call.entity';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(ScheduledCall)
    private readonly scheduledCallRepo: Repository<ScheduledCall>,
  ) {}

  async scheduleCall(toList: string[], audioId: string, callAt: Date): Promise<ScheduledCall[]> {
    const results: ScheduledCall[] = [];

    // 👇 Construct full audio URL here
    const baseUrl = 'https://sheduledbackend-production.up.railway.app/twiml/call/';
    const audioUrl = `${baseUrl}${audioId}`;

    for (const to of toList) {
      const newCall = this.scheduledCallRepo.create({
        toPhone: to,
        audioUrl,
        callAt,
      });

      const saved = await this.scheduledCallRepo.save(newCall);
      results.push(saved);
    }

    return results;
  }
}
