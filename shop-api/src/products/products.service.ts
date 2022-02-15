import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async getAllAvaliableProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({ archived: false });
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    const newProduct = await this.productRepository.save(product);
    if (!newProduct) return;
    return newProduct;
  }

  async updateProductById(
    id: string,
    product: UpdateProductDto,
  ): Promise<ProductEntity> {
    const productExists = await this.getProductById(id);
    if (!productExists) throw new NotFoundException();
    return await (
      await this.productRepository.update(id, product)
    ).raw;
  }

  async removeProductById(id: string) {
    return await this.productRepository.delete(id);
  }
}
