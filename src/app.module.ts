import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallsModule } from './calls/calls.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduledCallsModule } from './scheduler/scheduled-calls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledCall } from './scheduler/scheduled-call.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { Device } from './auth/device.entity';
import { SaveNumberModule } from './save_number/save-number.module';
import { SaveNumber } from './save_number/save-number.entity';
import { VoiceModule } from './save_voice/voice.module';
import { Voice } from './save_voice/voice.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'), // ✅ Use Railway plugin variable
        entities: [ScheduledCall, Device,SaveNumber,Voice],
        synchronize: true,
      }),
    }),
    CallsModule,
    ScheduledCallsModule,
    AuthModule,
    SaveNumberModule,
    VoiceModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
