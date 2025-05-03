import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voice } from 'src/save_voice/voice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TwimlService {
  constructor(
    @InjectRepository(Voice)
    private voiceRepository: Repository<Voice>,
  ) {}

  async generateVoiceTwimlById(id: number): Promise<string> {
    const voice = await this.voiceRepository.findOne({ where: { id } });

    if (!voice) {
      throw new NotFoundException(`Voice with ID ${id} not found`);
    }

    const url = encodeURI(voice.voiceUrl); // Ensure special chars are encoded

    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${url}</Play>
</Response>`;
  }
}
