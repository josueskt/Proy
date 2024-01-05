import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class AutorService {

    constructor(private readonly sql: SqlService) {

    }

    async traer(): Promise<any> {

        const reslut = await this.sql.query('select id_autor , nombre  from Libros.autor ')
        return reslut


    }
    async crear_autor(nombre: string ) {


        try {
             await this.sql.query('INSERT INTO libros.autor (nombre) values ($1)', [nombre])
            return "carrera creada exitosamente "
            
        } catch (error) {
            return error
        }
    
    }
    async eliminar(id:number){
        try {
            await this.sql.query('DELETE FROM libros.autor where id_autor = $1', [id])
           return "carrera creada exitosamente "
           
       } catch (error) {
           return error
       }
    }


}
