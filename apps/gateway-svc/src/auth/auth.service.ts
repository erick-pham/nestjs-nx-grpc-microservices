import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  ValidateResponse,
} from '@my-workspace/grpc/interface/auth';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  // This is service to verify token
  // We inject Auth ClientGrpc and invoke function
  // This will be used in Gateway Guard to verify request in Gateway before calls to protected apis in services such as product, order....
  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }
}
