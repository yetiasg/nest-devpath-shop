import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `${ENV}.env` : `development.env`,
      validationOptions: {
        abortEarly: true,
      },
    }),
    UsersModule,
    AdminModule,
    AuthModule,
    CategoriesModule,
    MailModule,
  ],
})
export class AppModule {}
