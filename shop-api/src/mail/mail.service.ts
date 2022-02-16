import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { OrderStatus } from 'src/orders/order-status.type';

export interface User {
  email: string;
}
@Injectable()
export class MailService {
  constructor(@InjectQueue('mailsend') private mailQueue: Queue) {}

  async newAccountMail(to: string, activationToken: string): Promise<boolean> {
    try {
      this.mailQueue.add('activation', {
        to,
        activationToken,
      });
      return true;
    } catch (errot) {
      return false;
    }
  }

  async setNewPasswordPasswordMail(
    to: string,
    resetPasswordToken: string,
  ): Promise<boolean> {
    try {
      this.mailQueue.add('reset-password', {
        to,
        resetPasswordToken,
      });
      return true;
    } catch (errot) {
      return false;
    }
  }

  async onChangeOrderStatusMail(to: string, status: OrderStatus) {
    try {
      this.mailQueue.add('change-status', { to, status });
      return true;
    } catch (error) {
      return false;
    }
  }
}
