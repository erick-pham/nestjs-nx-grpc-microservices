import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import {
  AUTH_SERVICE_NAME,
  AUTH_PACKAGE_NAME,
  url,
} from '@my-workspace/grpc/interface/auth';
import { AuthService } from './auth.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: url,
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../libs/grpc/proto/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
