import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import cluster from 'cluster'; 
import * as os from 'os';
import compression from 'compression';


dotenv.config();

async function bootstrap() {
  const maxWorkers = Math.min(os.cpus().length / 1.5, 3);

  if (cluster.isMaster) {
    
    for (let i = 0; i < maxWorkers; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    const app = await NestFactory.create(AppModule);

    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

    app.enableCors({
      origin: process.env.origin, 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    app.setGlobalPrefix('back');
    app.use(compression());
  

    await app.listen(3000); 
  }
}

bootstrap();
