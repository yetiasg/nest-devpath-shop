import { Serialize } from '../common/decorators/serialize.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.type';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller({ path: 'categories', version: '1' })
@Serialize(CategoryEntity)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(RoleGuard([Role.ADMIN]))
  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async getCategoryById(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  @UseGuards(RoleGuard([Role.ADMIN]))
  async createCategory(
    @Body() category: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.createCategory(category);
  }

  @Patch(':id')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async removeCategory(@Param('id') id: string) {
    return await this.categoriesService.removeCategory(id);
  }
}
