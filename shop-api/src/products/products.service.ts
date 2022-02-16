import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoriesService: CategoriesService,
    private readonly connection: Connection,
  ) {}
  async getAllAvaliableProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: ['categories'],
      where: { archived: false },
    });
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({ relations: ['categories'] });
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      relations: ['categories'],
      where: { id },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async getCategoryEntitiesByCategoryId(categories: string[]) {
    if (!categories || categories.length <= 0) return [];
    return await Promise.all(
      categories?.map(async (id) => {
        const category = await this.categoriesService.getCategoryById(id);
        if (category) {
          return category;
        }
      }),
    );
  }

  async createProduct(product: CreateProductDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const categories = await this.getCategoryEntitiesByCategoryId(
        product.categories,
      );
      const newProduct = await this.productRepository.save({
        ...product,
        categories,
      });
      if (!newProduct) {
        await queryRunner.rollbackTransaction();
      }
      await queryRunner.commitTransaction();
      return newProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateProductById(id: string, product: UpdateProductDto) {
    const productExists = await this.productRepository.findOne({ id });
    if (!productExists) throw new NotFoundException();

    const categories = await this.getCategoryEntitiesByCategoryId(
      product.categories,
    );

    Object.assign(productExists, { ...product, categories });
    return await productExists.save();
  }

  async removeProductById(id: string) {
    return await this.productRepository.delete(id);
  }
}
