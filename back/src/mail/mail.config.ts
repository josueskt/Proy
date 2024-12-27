import { MailerOptions } from '@nestjs-modules/mailer';

export const mailConfig: MailerOptions = {
  transport: {
    service: 'gmail', 
    auth: {
      user: process.env.email,  
      pass: process.env.passemail,  
    },
  },
  defaults: {
    from: `"BibliotecaYavirac" <${process.env.email}>`,  
  },
};
