import { Module } from '@nestjs/common';
import { TwimlController } from './twiml.controller'; // Import your TwimlController

@Module({
  imports: [],
  controllers: [TwimlController], // Add TwimlController here
  providers: [],
})
export class TwimlModule {}
