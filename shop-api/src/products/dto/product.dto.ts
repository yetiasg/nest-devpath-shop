import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @Exclude()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  categories: string[];

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  archived?: boolean;
}

export class UpdateProductDto extends CreateProductDto {}
