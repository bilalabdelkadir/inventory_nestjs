import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeMessage(email: string, firstName: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome To inventory program',
        template: 'welcome',
        context: { firstName },
      });
    } catch (error) {
      console.log('this is your error ', error);
      throw error;
    }
  }
}
