import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService as Jwt } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import {
  RegisterRequestDto,
  LoginRequestDto,
  ValidateRequestDto,
} from './auth.dto';
import { Auth } from './auth.entity';
import {
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from '@my-workspace/grpc/interface/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: Jwt,

    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>
  ) {}

  public async register({
    email,
    password,
  }: RegisterRequestDto): Promise<RegisterResponse> {
    let auth: Auth = await this.repository.findOne({ where: { email } });

    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    auth = new Auth();

    auth.email = email;
    auth.password = this.hashPassword(password);

    await this.repository.save(auth);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({
    email,
    password,
  }: LoginRequestDto): Promise<LoginResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found or Password wrong'],
        token: null,
      };
    }

    const isPasswordValid: boolean = this.isPasswordValid(
      password,
      auth.password
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found or Password wrong'],
        token: null,
      };
    }

    const token: string = this.generateToken(auth);

    return { token: token, status: HttpStatus.OK, error: null };
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<ValidateResponse> {
    try {
      const decoded: Auth = await this.jwt.verify(token);

      if (!decoded) {
        return {
          status: HttpStatus.FORBIDDEN,
          error: ['Token is invalid'],
          userId: null,
        };
      }

      const auth: Auth = await this.repository.findOne({
        where: { id: decoded.id },
      });

      if (!auth) {
        return {
          status: HttpStatus.CONFLICT,
          error: ['User not found'],
          userId: null,
        };
      }

      return { status: HttpStatus.OK, error: null, userId: auth.id };
    } catch (error) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }
  }

  public hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Generate JWT Token
  public generateToken(auth: Auth): string {
    return this.jwt.sign({ id: auth.id, email: auth.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }
}
