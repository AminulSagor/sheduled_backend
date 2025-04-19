import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveNumber } from './save-number.entity';
import { SaveNumberService } from './save-number.service';
import { SaveNumberController } from './save-number.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaveNumber])],
  controllers: [SaveNumberController],
  providers: [SaveNumberService],
})
export class SaveNumberModule {}
