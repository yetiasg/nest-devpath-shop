import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.ordersRepository.find();
  }

  async getOrderById(id: string): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne(id);
    if (!order) throw new NotFoundException();
    return order;
  }

  async createOrder(order: CreateOrderDto): Promise<OrderEntity> {
    const newOrder = await this.ordersRepository.insert(order);
    if (!newOrder) throw new InternalServerErrorException();
    return newOrder.raw;
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
