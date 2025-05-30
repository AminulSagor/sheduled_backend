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

    const existing = await this.numberRepo.findOne({
      where: { deviceId, phoneNumber },
    });

    if (existing) {
      return {
        status: 'duplicate',
        message: 'This number already exists for this device',
      };
    }

    const newEntry = this.numberRepo.create({ deviceId, name, phoneNumber, notes });
    await this.numberRepo.save(newEntry);

    return { status: 'success', message: 'Number saved successfully' };
  }

  async saveMany(entries: any[]) {
    const results: {
      name: string;
      phoneNumber: string;
      status: string;
      message: string;
    }[] = [];

    for (const entry of entries) {
      const { deviceId, name, phoneNumber, notes } = entry;
      const result = await this.save(deviceId, name, phoneNumber, notes);
      results.push({
        name,
        phoneNumber,
        status: result.status,
        message: result.message,
      });
    }

    return {
      status: 'batch-complete',
      results,
    };
  }

  async findAllByDeviceId(deviceId: string) {
    if (!deviceId) {
      return { status: 'error', message: 'deviceId is required' };
    }
  
    const numbers = await this.numberRepo.find({
      where: { deviceId },
      order: { createdAt: 'DESC' },
    });
  
    return {
      status: 'success',
      total: numbers.length,
      data: numbers,
    };
  }

  async deleteByPhoneNumber(deviceId: string, phoneNumber: string) {
    if (!deviceId || !phoneNumber) {
      return { status: 'error', message: 'deviceId and phoneNumber are required' };
    }
  
    const existing = await this.numberRepo.findOne({ where: { deviceId, phoneNumber } });
  
    if (!existing) {
      return { status: 'not_found', message: 'Number not found for this device' };
    }
  
    await this.numberRepo.remove(existing);
    return { status: 'deleted', message: 'Number deleted successfully' };
  }
  
  
}
