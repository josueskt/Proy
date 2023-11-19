import { Injectable } from '@nestjs/common';
import{Pool} from 'pg'
@Injectable()
export class AppService {



  getHello(): string {
    return 'Hello World!';
  }
}
