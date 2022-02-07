import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') productId: string) {
    return await this.productsService.getProductById(productId);
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(product);
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') productId: string,
    @Body() product: UpdateProductDto,
  ) {
    return await this.productsService.updateProductById(productId, product);
  }

  @Delete(':id')
  async removeProductById(@Param('id') productId: string) {
    return await this.productsService.removeProductById(productId);
  }
}
