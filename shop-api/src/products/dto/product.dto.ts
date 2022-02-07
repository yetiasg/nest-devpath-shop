import { Exclude } from 'class-transformer';
import { ProductEntity } from '../product.entity';

export class CreateProductDto extends ProductEntity {
  @Exclude()
  id: string;

  @Exclude()
  archived: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class UpdateProductDto extends ProductEntity {
  @Exclude()
  id: string;
}
