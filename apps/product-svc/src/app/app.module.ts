import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '../product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.product.sqlite',
      logging: true,
      entities: [Product],
      synchronize: true, // never true in production!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
