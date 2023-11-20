import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import { Libro } from './libro.interface';

@Injectable()
export class LibroService {

    constructor(private readonly sql: SqlService) {

    }

    async traer(): Promise<any> {

        const reslut = await this.sql.query('select * from libros.libro')
        return reslut


    }

    async by_id(id: Number): Promise<any> {
        try {
            const reslut = await this.sql.query('select * from libros.libro where id_carrera = ($1)', [id])
            if (reslut.length === 0) {
                return "no existe el id de esta carrera "
            } else { return reslut }
        } catch (error) {
            return error
        }


    }


    async crear(libro: Libro) {


        try {
            await this.sql.query('INSERT INTO libros.libro (titulo ,fecha_publi , descripcion , num_paginas , fk_creador , fk_autor , fk_carrera ) values ($1,CURRENT_DATE,$2,$3,$4,$5,$6)', [libro.titulo, libro.descripcion, libro.num_paginas, libro.fk_creador, libro.fk_autor, libro.fk_carrera])
            return "carrera creada exitosamente "

        } catch (error) {
            return error
        }

    }

    async eliminar(id: Number) {


        try {
            await this.sql.query('delete from  libros.libro where  id_carrera = ($1)', [id])
            return "carrera eliminada exitosamente "

        } catch (error) {
            return error
        }
    }
    async editar(id: Number, bod: String) {

        try {
            await this.sql.query('update libros.libro set nombre = $2 where  id_carrera = ($1)', [id, bod])
            return "carrera actualusada  exitosamente "

        } catch (error) {
            return error
        }

    }



}
