import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, firstName: string) {
    await this.mailerService.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'you have been added to inventory dashboard',
      template: 'welcome',
      context: { firstName },
    });
  }

  async sendEmailVerfication(email: string, firstName: string) {
    await this.mailerService.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'you have been added to inventory dashboard',
      template: 'welcome',
      context: { firstName },
    });
  }
}
