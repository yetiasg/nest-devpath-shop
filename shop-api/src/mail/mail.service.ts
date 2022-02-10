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
  public sendMail() {
    this.mailerService
      .sendMail({
        to: 'yetiasg@gmail.com',
        from: 'yetiasgii@gmail.com',
        subject: 'Elo elo z backendu XDDD. Selleo pozdrawia',
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
