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

  async newAccount(to: string, activationToken: string): Promise<boolean> {
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

  async onChangeOrderStatus(to: string, status: OrderStatus) {
    try {
      this.mailQueue.add('changing-status', { to, status });
      return true;
    } catch (error) {
      return false;
    }
  }
}
