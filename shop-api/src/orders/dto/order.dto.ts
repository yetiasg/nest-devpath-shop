import { Exclude } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @Exclude()
  id?: string;

  @ValidateNested()
  items: [
    {
      productId: string;
      amount: number;
    },
  ];
}

export class UpdateOrderDto extends CreateOrderDto {}
