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
             await this.sql.query('INSERT INTO libros.nacionalidad (nombre ) values ($1)', [nombre ])
            return "carrera creada exitosamente "
            
        } catch (error) {
            return error
        }
    
    }



}
