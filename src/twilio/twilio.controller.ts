// twilio.controller.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class TwilioController {
  @Get('twiml')
  getTwiML(@Query('audio') audio: string, @Res() res: Response) {
    res.type('text/xml');
    res.send(`<Response><Play>${audio}</Play></Response>`);
  }
}
