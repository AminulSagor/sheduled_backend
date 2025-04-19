import { Controller, Post, Body } from '@nestjs/common';
import { CallsService } from './calls.service';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post('schedule')
  scheduleCall(@Body() body: { to: string; audioUrl: string; callAt: string }) {
    return this.callsService.scheduleCall(body.to, body.audioUrl, new Date(body.callAt));
  }
}
