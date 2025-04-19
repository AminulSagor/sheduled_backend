import { Body, Controller, Post } from '@nestjs/common';
import { SaveNumberService } from './save-number.service';

@Controller('save-number')
export class SaveNumberController {
  constructor(private readonly saveNumberService: SaveNumberService) {}

  @Post()
  async save(@Body() body: any) {
    const { deviceId, name, phoneNumber, notes } = body;
    return this.saveNumberService.save(deviceId, name, phoneNumber, notes);
  }
}
