import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class EstadisticasService {

constructor( public sql:SqlService){}

async historial_iniciados(){

    try {
       return await this.sql.query('select fecha from  inst.secion')
       
       
   } catch (error) {
       return error
   }

}



}
