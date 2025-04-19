import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async validateDevice(deviceId: string): Promise<{ status: string }> {
    if (!deviceId) return { status: 'error: deviceId is required' };

    let device = await this.deviceRepo.findOne({ where: { deviceId } });

    if (!device) {
      device = this.deviceRepo.create({ deviceId });
      await this.deviceRepo.save(device);
      return { status: 'registered' };
    }

    return { status: 'logged-in' };
  }
}
