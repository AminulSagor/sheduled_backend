import { Injectable } from '@nestjs/common';
import { ScheduledCallsService } from '../scheduler/scheduled-calls.service';
import { ScheduledCall } from '../scheduler/scheduled-call.entity';

@Injectable()
export class CallsService {
  constructor(private readonly scheduledCallsService: ScheduledCallsService) {}

  async scheduleCall(toList: string[], audioUrl: string, callAt: Date): Promise<ScheduledCall[]> {
    const results: ScheduledCall[] = [];

    for (const to of toList) {
      const result = await this.scheduledCallsService.createSchedule(to, audioUrl, callAt);
      results.push(result);
    }

    return results;
  }
}
