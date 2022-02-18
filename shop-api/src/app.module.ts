import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { StatisticsModule } from './statistics/statistics.module';
import { DatabaseModule } from './database/database.module';
import { BullModule } from '@nestjs/bull';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? `production.env`
          : `development.env`,
      validationOptions: {
        abortEarly: true,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    MailModule,
    OrdersModule,
    ProductsModule,
    StatisticsModule,
    RoleModule,
  ],
})
export class AppModule {}
