import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwimlController } from './twiml.controller';
import { TwimlService } from './twiml.service';
import { Voice } from 'src/save_voice/voice.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Voice])],
  controllers: [TwimlController],
  providers: [TwimlService],
})
export class TwimlModule {}
