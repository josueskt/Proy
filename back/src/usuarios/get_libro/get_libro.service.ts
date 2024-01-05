import { Get, Injectable, Param } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class GetLibroService {
    constructor(private sql:SqlService){}

    async libro_byid(id:Number){
    try {
        const reslut = await this.sql.query('select l.titulo , l.fecha_publ , l.descripcion , l.imagen , l.num_paginas  , l.nombre_archivo, a.nombre from libros.libro as l INNER JOIN libros.autor as a ON a.id_autor =  l.fk_autor  where id_libro = ($1)', [id])
        return reslut
        
    } catch (error) {
        return error
    }




}


}
