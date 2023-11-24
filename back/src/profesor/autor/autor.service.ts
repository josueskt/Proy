import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class AutorService {

    constructor(private readonly sql: SqlService) {

    }

    async traer(): Promise<any> {

        const reslut = await this.sql.query('select * from Libros.autor')
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
