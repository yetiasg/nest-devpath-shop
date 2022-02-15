import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { OrderItemI } from './interfaces/order.interface';
import { OrderItemsService } from './order-items.service';
import { OrderStatus } from './order-status.type';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    private readonly orderItemsService: OrderItemsService,
    private readonly productsService: ProductsService,
    private readonly mailService: MailService,
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

  async updateOrderById(id: string, order: unknown): Promise<OrderEntity> {
    const orderExists = await this.getOrderById(id);
    if (!orderExists) throw new NotFoundException();
    return await (
      await this.ordersRepository.update(id, order)
    ).raw;
  }

  async updateOrderStatusById(orderId: string, status: OrderStatus) {
    const orderExists = await this.getOrderById(orderId);
    if (!orderExists) throw new NotFoundException();
    const updatedOrder = await this.ordersRepository.update(
      { id: orderId },
      { status },
    );
    if (!updatedOrder) throw new InternalServerErrorException();
    const user = await this.usersService.getUserById(orderExists.order.userId);
    if (!user) throw new NotFoundException();
    this.mailService.onChangeOrderStatusMail(user.email, status);
    return updatedOrder.raw;
  }

  async removeOrderById(id: string) {
    return await this.ordersRepository.delete(id);
  }
}
