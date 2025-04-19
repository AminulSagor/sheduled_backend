import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveNumber } from './save-number.entity';

@Injectable()
export class SaveNumberService {
  constructor(
    @InjectRepository(SaveNumber)
    private readonly numberRepo: Repository<SaveNumber>,
  ) {}

  async save(deviceId: string, name: string, phoneNumber: string, notes?: string) {
    if (!deviceId || !name || !phoneNumber) {
      return { status: 'error', message: 'deviceId, name, and phoneNumber are required' };
    }

    const newEntry = this.numberRepo.create({ deviceId, name, phoneNumber, notes });
    await this.numberRepo.save(newEntry);

    return { status: 'success', message: 'Number saved successfully' };
  }
}
