import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { mailConfig } from './mail.config';
import { mailService } from './mails.service';

@Module({

    imports: [
        MailerModule.forRoot(mailConfig),
        // MailerModule.forRootAsync({
        //   useFactory: () => mailConfig,  
        // }),
      ],
      providers: [mailService],
      exports: [mailService ],

})
export class MailModule {


    
}
