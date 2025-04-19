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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(), // ✅ Add this line
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: parseInt(config.get<string>('DB_PORT') || '5432'),
        username: config.get<string>('DB_USERNAME') || 'postgres',
        password: config.get<string>('DB_PASSWORD') || 'abc456',
        database: config.get<string>('DB_NAME') || 'calling_app',
        entities: [ScheduledCall,Device],
        synchronize: true,
      }),
    }),
    CallsModule,
    ScheduledCallsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
