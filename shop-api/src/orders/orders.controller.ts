import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<OrderEntity> {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto): Promise<OrderEntity> {
    return await this.ordersService.createOrder(order);
  }

  @Patch(':id')
  async updateOrderById(
    @Param('id') id: string,
    @Body() order: UpdateOrderDto,
  ): Promise<OrderEntity> {
    return await this.ordersService.updateOrderById(id, order);
  }

  @Delete(':id')
  async removeOrderById(@Param('id') id: string) {
    return await this.ordersService.removeOrderById(id);
  }
}
