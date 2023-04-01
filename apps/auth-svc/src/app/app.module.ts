import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      entities: [Auth],
      synchronize: true, // never true in production!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
