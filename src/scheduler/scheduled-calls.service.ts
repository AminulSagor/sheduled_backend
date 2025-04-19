import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';

import { TwilioService } from '../twilio/twilio.service';
import { ScheduledCall } from './scheduled-call.entity';

@Injectable()
export class ScheduledCallsService {
  constructor(
    @InjectRepository(ScheduledCall)
    private readonly callRepo: Repository<ScheduledCall>,
    private readonly twilioService: TwilioService,
  ) {}

  async createSchedule(to: string, audioUrl: string, callAt: Date) {
    const call = this.callRepo.create({ toPhone: to, audioUrl, callAt });
    return this.callRepo.save(call);
  }

  async processPendingCalls() {
    console.log('⏱ Cron running at', new Date());
    const now = new Date();
    const pendingCalls = await this.callRepo.find({
      where: {
        callAt: LessThanOrEqual(now),
        status: 'pending',
      },
    });

    for (const call of pendingCalls) {
        console.log('📞 Processing call to:', call.toPhone);
      try {
        await this.twilioService.makeCall(call.toPhone, call.audioUrl);
        call.status = 'done';
      } catch (err) {
        console.error('Call failed:', err);
        call.status = 'failed';
      }
      await this.callRepo.save(call);
    }
  }
}
