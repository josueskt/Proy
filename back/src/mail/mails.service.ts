import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class mailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(para:string,asunto:string,html): Promise<void> {
    await this.mailerService.sendMail({
      to: para,  
      subject: asunto,
      text: '',
      html: html,
    });
  }
}
