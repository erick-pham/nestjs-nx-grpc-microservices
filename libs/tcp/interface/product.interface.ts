import { Observable } from 'rxjs';

export const HOST = 'localhost';
export const PORT = 30300;
export const MESSAGE_PATTERN = {
  ProductCreate: { cmd: 'create' },
};

export interface CreateProductRequest {
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindOneData {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface FindOneRequest {
  id: number;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

export interface DecreaseStockRequest {
  id: number;
  orderId: number;
}

export interface DecreaseStockResponse {
  status: number;
  error: string[];
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  createProduct(
    request: CreateProductRequest
  ): Observable<CreateProductResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  decreaseStock(
    request: DecreaseStockRequest
  ): Observable<DecreaseStockResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  findOne(
    request: FindOneRequest
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  decreaseStock(
    request: DecreaseStockRequest
  ):
    | Promise<DecreaseStockResponse>
    | Observable<DecreaseStockResponse>
    | DecreaseStockResponse;
}

export const PRODUCT_SERVICE_NAME = 'ProductService';
