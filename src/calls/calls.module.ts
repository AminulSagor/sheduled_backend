import { Module } from '@nestjs/common';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import { TwilioModule } from '../twilio/twilio.module';
import { ScheduledCallsModule } from '../scheduler/scheduled-calls.module';

@Module({
  imports: [TwilioModule, ScheduledCallsModule],
  controllers: [CallsController],
  providers: [CallsService],
})
export class CallsModule {}
