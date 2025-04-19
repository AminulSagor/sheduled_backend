import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Device } from './device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
