import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class AutorService {

    constructor(private readonly sql: SqlService) {

    }

    async traer(): Promise<any> {

        const reslut = await this.sql.query('select a.id_autor , a.nombre, n.nombre as nacionalidad from Libros.autor as a  inner join libros.nacionalida as n on  a.fk_nacionalidad = n.id_nacionalidad')
        return reslut


    }
    async crear_autor(nombre: String ,nacionalidad:Number) {


        try {
             await this.sql.query('INSERT INTO libros.autor (nombre , fk_nacionalidad ) values ($1,$2)', [nombre , nacionalidad])
            return "carrera creada exitosamente "
            
        } catch (error) {
            return error
        }
    
    }


}
