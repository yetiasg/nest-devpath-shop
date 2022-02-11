import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';

@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  @Public()
  async getProductById(@Param('id') productId: string): Promise<ProductEntity> {
    return await this.productsService.getProductById(productId);
  }

  @Post()
  async createProduct(
    @Body() product: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.createProduct(product);
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') productId: string,
    @Body() product: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.updateProductById(productId, product);
  }

  @Delete(':id')
  async removeProductById(@Param('id') productId: string) {
    return await this.productsService.removeProductById(productId);
  }
}
