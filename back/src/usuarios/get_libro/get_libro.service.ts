import { Get, Injectable, Param } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class GetLibroService {
    constructor(private sql:SqlService){}

    async libro_byid(id:Number){
    try {
        const reslut = await this.sql.query('select l.titulo , l.year_of_publication , l.review, l.imagen , l.nombre_archivo, a.nombre , t.nombre as tipo from libros.libro as l INNER JOIN libros.autor as a ON a.id_autor =  l.fk_autor   LEFT JOIN libros.tipo as t on l.fk_tipo = t.id_tipo where id_libro = ($1)', [id])
        return reslut
        
    } catch (error) {
        return error
    }




}


}
