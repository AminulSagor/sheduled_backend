import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { ConfigModule } from '@nestjs/config';
import { TwilioController } from './twilio.controller';

@Module({
  imports: [ConfigModule],
  providers: [TwilioService],
  controllers: [TwilioController],
  exports: [TwilioService],
})
export class TwilioModule {}
