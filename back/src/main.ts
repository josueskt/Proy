import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();  
async function bootstrap() {  

  const app = await NestFactory.create(AppModule);

  // Configura body-parser para aumentar el límite de carga
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

  // Habilita CORS
  app.enableCors({
    origin: 'http://192.168.237.129:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
