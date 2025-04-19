import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voice } from './voice.entity';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Voice])],
  providers: [VoiceService],
  controllers: [VoiceController],
})
export class VoiceModule {}
