import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  HOST,
  PORT,
  PRODUCT_SERVICE_NAME,
} from '@my-workspace/tcp/interface/product';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: PORT,
        },
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
