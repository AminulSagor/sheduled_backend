import crypto from 'crypto';
(global as any).crypto = crypto; // ✅ Polyfill for TypeORM's use of crypto.randomUUID()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
