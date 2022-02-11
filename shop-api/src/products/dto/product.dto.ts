import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @Exclude()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested()
  @IsOptional()
  categories: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  archived?: boolean;
}

export class UpdateProductDto extends CreateProductDto {}
