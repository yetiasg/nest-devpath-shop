import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException();
    return category;
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ name });
    if (!category) throw new NotFoundException();
    return category;
  }

  async createCategory(category: CreateCategoryDto): Promise<CategoryEntity> {
    if (await this.getCategoryByName(category.name))
      throw new BadRequestException();

    const newCategory = await this.categoryRepository.save(category);
    if (!newCategory) return;
    return newCategory;
  }

  async updateCategory(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const categoryExists = await this.getCategoryById(id);
    if (!categoryExists) throw new NotFoundException();
    return await (
      await this.categoryRepository.update(id, category)
    ).raw;
  }

  async removeCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}
