import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Response as ResponseExpress } from 'express';
import { lastValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
} from '@my-workspace/grpc/interface/auth';
import {
  RegisterRequestDto,
  LoginRequestDto,
  ValidateRequestDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Inject(AuthService)
  public readonly authService: AuthService;

  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  async register(
    @Body() body: RegisterRequestDto,
    @Res() response: ResponseExpress
  ) {
    const rs = await lastValueFrom(this.svc.register(body));
    return response.status(rs.status).json(rs);
  }

  @Put('login')
  async login(@Body() body: LoginRequestDto, @Res() response: ResponseExpress) {
    const rs = await lastValueFrom(this.svc.login(body));
    return response.status(rs.status).json(rs);
  }

  @Post('verify-token')
  async verifyToken(
    @Body() body: ValidateRequestDto,
    @Res() response: ResponseExpress
  ) {
    const rs = await this.authService.validate(body.token);
    return response.status(rs.status).json(rs);
  }
}
