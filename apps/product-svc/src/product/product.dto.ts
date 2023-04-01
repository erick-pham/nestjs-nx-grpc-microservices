import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  CreateProductRequest,
  DecreaseStockRequest,
  FindOneRequest,
} from '@my-workspace/tcp/interface/product';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class CreateProductRequestDto implements CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'Iphone 15',
    description: 'Product name',
  })
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '#APR03A-31A',
    description: 'Product sku',
  })
  public readonly sku: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @ApiProperty({
    type: Number,
    default: null,
    description: 'Product stock',
  })
  public readonly stock: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @ApiProperty({
    type: Number,
    default: null,
    description: 'Product price',
  })
  public readonly price: number;
}

export class DecreaseStockRequestDto implements DecreaseStockRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly orderId: number;
}
