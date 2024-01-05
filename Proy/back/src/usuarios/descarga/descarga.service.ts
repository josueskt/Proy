import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class DescargaService {
    constructor(private sql:SqlService){}


    async descargados(id_user:string , libro_id:Number){

        try{
        const reslut = await this.sql.query('INSERT INTO tramites.prestamo (fk_user,fk_libro, fecha_descarga)VALUES($1,$2,CURRENT_DATE)',[id_user,libro_id])
        return reslut
        }catch(error){
            throw error       
         }
            }
}

