import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bull';

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
  public sendMail(to: string) {
    this.mailerService
      .sendMail({
        to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - testing invitation mail',
        text: 'EloElo',
        html: '<b>EloElo</b>',
      })
      .then((success) => {
        return success;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }
}
