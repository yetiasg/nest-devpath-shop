import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { OrderItemI } from './interfaces/order.interface';
import { OrderItemsEntity } from './order-items.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItemsEntity)
    private readonly oderItemsRepository: Repository<OrderItemsEntity>,
  ) {}

  async getAllOrderItems() {
    return await this.oderItemsRepository.find();
  }

  async getOrderItemsByOrderId(orderId: string) {
    const orderItems = await this.oderItemsRepository.find({ orderId });
    if (!orderItems || orderItems.length <= 0) throw new NotFoundException();
    return orderItems;
  }

  async removeOrderItemsByOrderId(orderId: string) {
    return await this.oderItemsRepository.delete({ orderId });
  }

  async createOrderItem(
    item: OrderItemI,
    orderId: string,
    productData: ProductEntity,
  ) {
    const orderItem = {
      orderId,
      productId: productData.id,
      amount: item.amount,
      price: productData.price,
    };

    const newOrderItem = await this.oderItemsRepository.save(orderItem);
    if (!newOrderItem) throw new InternalServerErrorException();
    return newOrderItem;
  }
}
