import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post('save')
  async saveVoice(@Body() body: any) {
    const { deviceId, voiceName, voiceUrl } = body;
    return this.voiceService.save(deviceId, voiceName, voiceUrl);
  }

  @Get('list')
  async listVoices(@Query('deviceId') deviceId: string) {
    return this.voiceService.findAllByDevice(deviceId);
  }

  @Delete()
async deleteVoice(
  @Query('deviceId') deviceId: string,
  @Query('voiceName') voiceName: string,
) {
  return this.voiceService.deleteByName(deviceId, voiceName);
}

}
