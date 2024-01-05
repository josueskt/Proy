import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class MateriaService {

    constructor(public sql: SqlService) { }
    async trae() {
        try {
            return await this.sql.query('select * from  libros.materia')


        } catch (error) {
            return error
        }
    };
    async by_id(id:Number) {
        try {
            return await this.sql.query('select * from  libros.materia where id_materia = $1' , [id])


        } catch (error) {
            return error
        }
    };
    async crear(bod) {
        try {
            await this.sql.query('insert into libros.materia(nombre , fk_carrera) values ($1 , $2)',[bod.nombre , bod.fk_carrera ])
            return "carrera creada exitosamente "

        } catch (error) {
            return error
        }
    };
    async editar(id:Number , bod) {

        const n = bod.nombre; 
        const fk = bod.fk_carrera
        try {
            await this.sql.query('Update libros.materia set nombre = ($1) , fk_carrera =($2)  where id_materia = ($3)',[n,fk,id])
            return "carrera creada exitosamente "

        } catch (error) {
            return error
        }
    };
    async eliminar( id:Number) {
        try {
            await this.sql.query('delete from libros.materia where id_materia = ($1)' ,[id])
            return "carrera eliminada exitosamente "

        } catch (error) {
            return error
        }
    };
}
