/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestMicroservice, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { protobufPackage, url } from '@my-workspace/grpc/interface/auth';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('NestJS Auth and GRPC microservice')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3010;
  await app.listen(port);
  Logger.log(
    `🚀 AuthService is running on: http://localhost:${port}/${globalPrefix}`
  );

  const appMs: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: url,
        package: protobufPackage,
        protoPath: join(__dirname, '../../../libs/grpc/proto/auth.proto'),
      },
    }
  );
  appMs.useGlobalFilters(new HttpExceptionFilter());
  appMs.useGlobalPipes(new ValidationPipe({ transform: true }));
  await appMs.listen();

  Logger.log(`🚀 AuthService is running with Transport.GRPC`);
}

bootstrap();
