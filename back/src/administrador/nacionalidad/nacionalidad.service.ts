import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class NacionalidadService {
    constructor(private readonly sql: SqlService) {

    }

    async traer_naciolanlidad(): Promise<any> {
     

        const reslut = await this.sql.query('select * from Libros.nacionalida')
        return reslut


    }
    

    async crear_autor(nombre: String ) {


        try {
             await this.sql.query('INSERT INTO libros.nacionalida (nombre) values ($1)', [nombre])
            return "carrera creada exitosamente "
            
        } catch (error) {
            return error
        }
    
    }
    async eliminar(id: Number) {
        console.log("entrop")

        try {
            await this.sql.query('delete from  libros.nacionalida where  id_nacionalidad = $1', [id])
            return { message: "Carrera eliminada exitosamente" };
           
       } catch (error) {
           return error
       }
    }



}
