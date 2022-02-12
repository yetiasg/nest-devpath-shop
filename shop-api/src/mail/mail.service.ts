import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bull';
import { OrderStatus } from 'src/orders/order-status.type';

export interface User {
  email: string;
}
@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mailsend') private mailQueue: Queue,
    private readonly mailerService: MailerService,
  ) {}

  async sendConfirmationEmail(): Promise<boolean> {
    try {
      this.mailQueue.add('confirmation', {});
      return true;
    } catch (err) {
      return false;
    }
  }
  // public sendMail(to: string, activationToken: string) {
  //   this.mailerService
  //     .sendMail({
  //       to,
  //       from: 'yetiasgii@gmail.com',
  //       subject: 'Shop - testing invitation mail',
  //       text: `Activate account`,
  //       html: `<b>: http://localhost:8080/activate?token=${activationToken}</b>`,
  //     })
  //     .then((success) => {
  //       return success;
  //     })
  //     .catch((err) => {
  //       throw new InternalServerErrorException(err);
  //     });
  // }

  public newAccount(to: string, activationToken: string) {
    this.mailerService
      .sendMail({
        to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - testing invitation mail',
        text: `Activate account`,
        html: `<b>: http://localhost:8080/activate?token=${activationToken}</b>`,
      })
      .then((success) => {
        return success;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  public onChangeOrderStatus(to: string, status: OrderStatus) {
    this.mailerService
      .sendMail({
        to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - testing invitation mail',
        text: `Activate account`,
        html: `<b>Order status has changed: ${status}</b>`,
      })
      .then((success) => {
        return success;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }
}
