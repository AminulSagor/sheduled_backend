import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScheduledCallsService } from './scheduled-calls.service';

@Injectable()
export class ScheduledCallsCron {
  constructor(private readonly scheduledCallsService: ScheduledCallsService) {}

  @Cron(CronExpression.EVERY_MINUTE, { name: 'process_pending_calls' })
async handleCron() {
  const enabled = process.env.ENABLE_CRON === 'true';
  if (enabled) {
    await this.scheduledCallsService.processPendingCalls();
  }
}

}
