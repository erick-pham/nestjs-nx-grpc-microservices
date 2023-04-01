import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from '@my-workspace/grpc/interface/auth';

import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  Register(payload: RegisterRequestDto): Promise<RegisterResponse> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  login(payload: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(payload);
  }

  @Put('login')
  restLogin(@Body() loginPayload: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(loginPayload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }
}
