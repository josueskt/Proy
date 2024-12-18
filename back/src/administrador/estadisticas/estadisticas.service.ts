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

async historial_prestamos(){

    try {
       return await this.sql.query('SELECT fecha_reserva FROM tramites.prestamo_libro')       
       
   } catch (error) {
       return error
   }

}


async informe(fecha){

    try {
       return await this.sql.query(`SELECT fecha , email , id_user cedula  , nombre_rol rol , b.nombre usuario , d.nombre carrera FROM inst.secion  a INNER JOIN inst.usuario  b on a.fk_user = b.id_user INNER JOIN inst.rol c on b.fk_rol = c.id_rol LEFT JOIN libros.carrera d on  b.fk_carrera = d.id_carrera  where fecha = $1`,[fecha])       
       
   } catch (error) {
       return error
   }

}

}
