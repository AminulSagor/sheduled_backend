import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SaveNumberService } from './save-number.service';

@Controller('save-number')
export class SaveNumberController {
  constructor(private readonly saveNumberService: SaveNumberService) {}

  @Post()
async save(@Body() body: any) {
  if (Array.isArray(body)) {
    return this.saveNumberService.saveMany(body);
  } else {
    const { deviceId, name, phoneNumber, notes } = body;
    return this.saveNumberService.save(deviceId, name, phoneNumber, notes);
  }
}

@Get()
  async getAllByDevice(@Query('deviceId') deviceId: string) {
    return this.saveNumberService.findAllByDeviceId(deviceId);
  }

  @Delete()
  async deleteByNumber(
    @Query('deviceId') deviceId: string,
    @Query('phoneNumber') phoneNumber: string,
  ) {
    return this.saveNumberService.deleteByPhoneNumber(deviceId, phoneNumber);
  }

}
