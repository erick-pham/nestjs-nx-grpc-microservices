import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Response as ResponseExpress } from 'express';
import {
  PRODUCT_SERVICE_NAME,
  MESSAGE_PATTERN,
  CreateProductResponse,
} from '@my-workspace/tcp/interface/product';
import { CreateProductRequestDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE_NAME) private client: ClientProxy) {}

  @Post()
  async addProduct(
    @Body() body: CreateProductRequestDto,
    @Res() response: ResponseExpress
  ) {
    const rs = await lastValueFrom(
      this.client.send<CreateProductResponse>(
        MESSAGE_PATTERN.ProductCreate,
        body
      )
    );

    return response.status(rs.status).json(rs);
  }
}
