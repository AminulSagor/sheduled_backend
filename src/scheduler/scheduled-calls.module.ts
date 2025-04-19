import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduledCallsService } from './scheduled-calls.service';
import { ScheduledCallsCron } from './scheduled-calls.cron';
import { TwilioModule } from '../twilio/twilio.module';
import { ScheduledCall } from './scheduled-call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledCall]), TwilioModule],
  providers: [ScheduledCallsService, ScheduledCallsCron],
  exports: [ScheduledCallsService],
})
export class ScheduledCallsModule {}
