import { Serialize } from '../common/decorators/serialize.decorator';
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
import { CurrentUserId } from 'src/common/decorators/currentUserId.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.type';
import { OrderItemI } from './interfaces/order.interface';
import { OrderStatus } from './order-status.type';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';

@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Serialize(OrderEntity)
  @UseGuards(RoleGuard([Role.ADMIN, Role.USER]))
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.ordersService.getAllOrders();
  }

  @Get('user')
  @Serialize(OrderEntity)
  @UseGuards(RoleGuard([Role.USER]))
  async getCurrentUserOrders(@CurrentUserId() userId: string) {
    return await this.ordersService.getOrdersByUserId(userId);
  }

  @Get(':id')
  @UseGuards(RoleGuard([Role.ADMIN, Role.USER]))
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  @Serialize(OrderEntity)
  @UseGuards(RoleGuard([Role.ADMIN, Role.USER]))
  async createOrder(@CurrentUserId() id: string, @Body('items') items) {
    return await this.ordersService.createOrder(id, items);
  }

  @Patch(':id')
  @Serialize(OrderEntity)
  @UseGuards(RoleGuard([Role.ADMIN]))
  async updateOrderById(
    @Param('id') id: string,
    @Body() order: OrderItemI,
  ): Promise<OrderEntity> {
    return await this.ordersService.updateOrderById(id, order);
  }

  @Patch('/status/:id')
  @Serialize(OrderEntity)
  @UseGuards(RoleGuard([Role.ADMIN]))
  async updateOrderStatusById(
    @Param('id') orderId: string,
    @Body('status') status: OrderStatus,
  ) {
    return await this.ordersService.updateOrderStatusById(orderId, status);
  }

  @Delete(':id')
  @Serialize(OrderEntity)
  @UseGuards(RoleGuard([Role.ADMIN]))
  async removeOrderById(@Param('id') id: string) {
    return await this.ordersService.removeOrderById(id);
  }
}
