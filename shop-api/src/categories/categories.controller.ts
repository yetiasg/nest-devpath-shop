import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoriesService.getAllCategories();
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    return await this.categoriesService.getCategoryById(id);
  }

  async createCategory(category: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoriesService.createCategory(category);
  }

  async updateCategory(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.updateCategory(id, category);
  }

  async removeCategory(id) {
    return await this.categoriesService.removeCategory(id);
  }
}
