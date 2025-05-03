import { Controller, Post, Body } from '@nestjs/common';
import { CallsService } from './calls.service';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post('schedule')
async scheduleCall(
  @Body() body: { to: string | string[]; audioId: string; callAt: string }
) {
  const toNumbers = Array.isArray(body.to) ? body.to : [body.to];
  return this.callsService.scheduleCall(toNumbers, body.audioId, new Date(body.callAt));
}

}
