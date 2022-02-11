import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/order.dto';
import { OrderItemI } from './interfaces/order.interface';
import { OrderItemsService } from './order-items.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    private readonly orderItemsService: OrderItemsService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.ordersRepository.find();
  }

  async getOrderById(id: string) {
    const order = await this.ordersRepository.findOne(id);
    if (!order) throw new NotFoundException();
    const orderItems = await this.orderItemsService.getOrderItemsByOrderId(
      order.id,
    );

    return {
      order,
      orderItems,
    };
  }

  async getTotalPrice(items: OrderItemI[]) {
    const prices = items.map(async (item) => {
      const product = await this.productsService.getProductById(
        item?.productId,
      );
      return Number(product.price) * item.amount;
    });
    return (await Promise.all(prices)).reduce((a, b) => a + b);
  }

  async createOrder(userId: string, items: OrderItemI[]) {
    const totalPrice = await this.getTotalPrice(items);

    if (!totalPrice) throw new InternalServerErrorException();
    const newOrder = await this.ordersRepository.save({
      userId,
      totalPrice,
    });

    if (!newOrder) throw new InternalServerErrorException();

    items.forEach(async (item) => {
      const product = await this.productsService.getProductById(
        item?.productId,
      );
      await this.orderItemsService.createOrderItem(item, newOrder.id, product);
    });

    return newOrder;
  }

  async updateOrderById(
    id: string,
    order: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const orderExists = await this.getOrderById(id);
    if (!orderExists) throw new NotFoundException();
    return await (
      await this.ordersRepository.update(id, order)
    ).raw;
  }

  async removeOrderById(id: string) {
    return await this.ordersRepository.delete(id);
  }
}

// "ab305e29-437f-4647-a730-d302ba069774",
// "10edf986-a807-46ed-80db-3fa5f6055e0d"
// "8c86e7ba-c3f0-45b9-aa34-24aa01d13d42"
