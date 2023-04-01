/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestMicroservice, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { HOST, PORT } from '@my-workspace/tcp/interface/product';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3030;
  await app.listen(port);
  Logger.log(
    `🚀 ProductService is running on: http://localhost:${port}/${globalPrefix}`
  );

  const appMs: INestMicroservice =
    await NestFactory.createMicroservice<TcpOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: PORT,
      },
    });
  await appMs.listen();
  Logger.log(`🚀 ProductService is running with Transport.TCP`);
}

bootstrap();
