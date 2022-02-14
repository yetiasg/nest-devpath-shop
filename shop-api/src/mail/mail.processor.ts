import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('mailsend')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailerService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processor:@OnQueueActive - Processing job ${job.id} of type ${
        job.name
      }. Data: ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.log(
      `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${
        job.name
      }. Result: ${JSON.stringify(result)}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.stack}`,
      error.stack,
    );
  }

  @Process('activation')
  async newAccount(job: Job) {
    try {
      const success = await this.mailerService.sendMail({
        to: job.data.to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - testing invitation mail',
        text: `Activate account`,
        html: `
          <p>activation url for web: http://localhost:8080/activate?token=${job.data.activationToken}</p>
          <p>activation url for web: http://localhost:3005/activate/${job.data.activationToken}</p>
          `,
      });
      return success;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Process('changing-status')
  async onChangeOrderStatus(job: Job) {
    try {
      const success = this.mailerService.sendMail({
        to: job.data.to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - testing invitation mail',
        text: `Activate account`,
        html: `<b>Order status has changed: ${job.data.status}</b>`,
      });
      return success;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
