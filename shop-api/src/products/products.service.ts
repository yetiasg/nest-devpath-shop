import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async getAllProducts() {
    return ['s', 'a', 'd'];
    // return await this.productRepository.find();
  }

  async getProductById(id: string) {
    return { id, product: { name: 'd' } };
    // return await this.productRepository.findOne(id);
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    return product;
    // return this.productRepository.create(product);
  }

  async updateProductById(id: string, product: ProductEntity) {
    return await this.productRepository.update(id, product);
  }

  async removeProductById(id: string) {
    return await this.productRepository.delete(id);
  }
}
