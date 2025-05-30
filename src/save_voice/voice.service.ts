import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voice } from './voice.entity';

@Injectable()
export class VoiceService {
  constructor(
    @InjectRepository(Voice)
    private readonly voiceRepo: Repository<Voice>,
  ) {}

  async save(deviceId: string, voiceName: string, voiceUrl: string) {
    const existing = await this.voiceRepo.findOne({
      where: { deviceId, voiceName },
    });

    if (existing) {
      return {
        status: 'duplicate',
        message: 'This voice name already exists for this device',
      };
    }

    const entry = this.voiceRepo.create({ deviceId, voiceName, voiceUrl });
    await this.voiceRepo.save(entry);
    return { status: 'success', message: 'Voice metadata saved' };
  }

  async findAllByDevice(deviceId: string) {
    return this.voiceRepo.find({ where: { deviceId } });
  }

  async deleteByName(deviceId: string, voiceName: string) {
    if (!deviceId || !voiceName) {
      return { status: 'error', message: 'deviceId and voiceName are required' };
    }
  
    const voice = await this.voiceRepo.findOne({ where: { deviceId, voiceName } });
    if (!voice) {
      return { status: 'not_found', message: 'Voice not found' };
    }
  
    await this.voiceRepo.remove(voice);
    return { status: 'deleted', message: 'Voice deleted successfully' };
  }
  
}
