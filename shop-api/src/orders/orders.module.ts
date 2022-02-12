import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrderItemsEntity } from './order-items.entity';
import { OrderItemsService } from './order-items.service';
import { OrderEntity } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemsEntity]),
    AuthModule,
    ConfigModule,
    ProductsModule,
    UsersModule,
    MailModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderItemsService],
})
export class OrdersModule {}
