import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';

@Processor('mailsend')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

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
  async newAccountMail(job: Job) {
    try {
      const success = await this.mailerService.sendMail({
        to: job.data.to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - testing invitation mail',
        text: `Activate account`,
        html: `
          <p>activation url for web: ${this.configService.get<string>(
            'FRONT_BASE_URL',
          )}/activation/${job.data.activationToken}</p>
          <p>activation url for backend: ${this.configService.get<string>(
            'BACKEND_BASE_URL',
          )}/v1/auth/activate/${job.data.activationToken}</p>
          `,
      });
      return success;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Process('reset-password')
  async resetPasswordMail(job: Job) {
    try {
      const success = await this.mailerService.sendMail({
        to: job.data.to,
        from: 'yetiasgii@gmail.com',
        subject: 'Shop - reset password',
        text: `Reset password`,
        html: `
          <p>Reset password: ${this.configService.get<string>(
            'FRONT_BASE_URL',
          )}/reset/${job.data.resetPasswordToken}</p>
          <p>Reset password: ${this.configService.get<string>(
            'BACKEND_BASE_URL',
          )}/v1/auth/reset/${job.data.resetPasswordToken}</p>
          `,
      });
      return success;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Process('change-status')
  async onChangeOrderStatusMail(job: Job) {
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
