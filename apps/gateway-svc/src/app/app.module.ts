import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
