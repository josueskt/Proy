import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class ReporteLibroService {


    constructor(private slq: SqlService) { }
    reportes( carrera: number,tipo: number,) {
        let query = `SELECT DISTINCT l.id_libro, l.titulo, l.nombre_archivo, l.year_of_publication, l.review, l.imagen,
            c.nombre as carrera, a.nombre as autor, t.nombre as tipo
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        LEFT JOIN libros.tipo as t ON l.fk_tipo = t.id_tipo
        LEFT JOIN libros.palabras_libro as pl ON pl.fk_libro = l.id_libro
        LEFT JOIN libros.palabras_clave as pc ON pl.fk_palabra = pc.id_palabra`;
        
        const conditions = [];
        const params = [];

        if (carrera) {
            conditions.push(`c.id_carrera = $${params.length + 1}`);
            params.push(carrera);
        }

        if (tipo) {
            conditions.push(`t.id_tipo = $${params.length + 1}`);
            params.push(tipo);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        return this.slq.query(query, params);
    }

}
