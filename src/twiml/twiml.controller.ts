import { Controller, Post, Param, Header } from '@nestjs/common';
import { TwimlService } from './twiml.service';

@Controller('twiml')
export class TwimlController {
  constructor(private readonly twimlService: TwimlService) {}

  @Post('call/:id')
  @Header('Content-Type', 'text/xml')
  async handlePostRequest(@Param('id') id: string): Promise<string> {
    return this.twimlService.generateVoiceTwimlById(Number(id));
  }
}
