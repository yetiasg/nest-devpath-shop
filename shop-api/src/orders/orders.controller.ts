import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt';
import { CurrentUserId } from 'src/common/decorators/currentUserId.decorator';
import { OrderItemI } from './interfaces/order.interface';
import { OrderStatus } from './order-status.type';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';

@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@CurrentUserId() id: string, @Body('items') items) {
    return await this.ordersService.createOrder(id, items);
  }

  @Patch(':id')
  async updateOrderById(
    @Param('id') id: string,
    @Body() order: OrderItemI,
  ): Promise<OrderEntity> {
    return await this.ordersService.updateOrderById(id, order);
  }

  @Patch('/status/:id')
  async updateOrderStatusById(
    @Param('id') orderId: string,
    @Body('status') status: OrderStatus,
  ) {
    return await this.ordersService.updateOrderStatusById(orderId, status);
  }

  @Delete(':id')
  async removeOrderById(@Param('id') id: string) {
    return await this.ordersService.removeOrderById(id);
  }
}
