import { Injectable } from '@nestjs/common';
import { ScheduledCallsService } from '../scheduler/scheduled-calls.service';

@Injectable()
export class CallsService {
  constructor(private readonly scheduledCallsService: ScheduledCallsService) {}

  async scheduleCall(to: string, audioUrl: string, callAt: Date) {
    return this.scheduledCallsService.createSchedule(to, audioUrl, callAt);
  }
}
