import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class EstadisticasService {

constructor( public sql:SqlService){}

async historial_iniciados(){

    try {
        await this.sql.query('select fecha from  usuario.secion')
       return "carrera creada exitosamente "
       
   } catch (error) {
       return error
   }

}



}
