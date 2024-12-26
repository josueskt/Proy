import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import cluster from 'cluster'; 
import * as os from 'os';
import compression from 'compression';


dotenv.config();

async function bootstrap() {
  const numCPUs = os.cpus().length;

  if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    
    for (let i = 0; i < numCPUs; i++) {
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

    app.use(compression());

    await app.listen(3000);
    console.log(`Worker process ${process.pid} is running`);
  }
}

bootstrap();
