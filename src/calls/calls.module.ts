import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import { TwilioModule } from '../twilio/twilio.module';
import { ScheduledCall } from '../scheduler/scheduled-call.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduledCall]), // ✅ Register entity here
    TwilioModule,
  ],
  controllers: [CallsController],
  providers: [CallsService],
})
export class CallsModule {}
