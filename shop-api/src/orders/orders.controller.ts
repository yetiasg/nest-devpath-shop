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
import { UpdateOrderDto } from './dto/order.dto';
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
    @Body() order: UpdateOrderDto,
  ): Promise<OrderEntity> {
    return await this.ordersService.updateOrderById(
      'ae2c00dd-ef08-4911-8167-54cbfbe9001b',
      order,
    );
  }

  @Delete(':id')
  async removeOrderById(@Param('id') id: string) {
    return await this.ordersService.removeOrderById(id);
  }
}
