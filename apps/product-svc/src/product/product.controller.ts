import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateProductRequest,
  CreateProductResponse,
  MESSAGE_PATTERN,
} from '@my-workspace/tcp/interface/product';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @MessagePattern(MESSAGE_PATTERN.ProductCreate)
  addProduct(payload: CreateProductRequest): Promise<CreateProductResponse> {
    return this.service.createProduct(payload);
  }

  @Post()
  restAddProduct(
    @Body() payload: CreateProductRequest
  ): Promise<CreateProductResponse> {
    return this.service.createProduct(payload);
  }
}
