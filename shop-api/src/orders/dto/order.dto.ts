import { Exclude } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ProductEntity } from 'src/products/product.entity';
import { UserEntity } from 'src/users/user.entity';

export class CreateOrderDto {
  @Exclude()
  id?: string;

  @IsString()
  customer: UserEntity;

  @ValidateNested()
  product: ProductEntity;

  @IsString()
  amount: number;
}

export class UpdateOrderDto extends CreateOrderDto {}
