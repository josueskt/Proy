import { Injectable } from '@nestjs/common';
import { json } from 'body-parser';
import { Console } from 'console';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class BuscadorService {
  constructor(private sql: SqlService) {}

  async buscar_libros(cadena: string, carrera: number, page: number,tipo:number,estante:string,seccion:string) {
    const pageNumber = page || 1;
    const pageSize = 12;
    const offset = (pageNumber - 1) * pageSize;
  
    // Los parámetros de la consulta
    // let params = [`%${cadena}%`, pageSize, offset];
    let params:any = [`%${cadena}%`];
    let query: string;
    let result;
  
    try {
    let  n = 2
      query = `
        SELECT DISTINCT l.id_libro, l.titulo, l.nombre_archivo, l.year_of_publication, l.review, l.imagen,
                        c.nombre as nombre_carrera, a.nombre as autor_nombre, t.nombre as tipo
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        LEFT JOIN libros.tipo as t ON l.fk_tipo = t.id_tipo
        LEFT JOIN libros.palabras_libro as pl ON pl.fk_libro = l.id_libro
        LEFT JOIN libros.palabras_clave as pc ON pl.fk_palabra = pc.id_palabra
        LEFT JOIN libros.seccion s on l.fk_seccion = s.id_seccion
        LEFT JOIN libros.estante e on s.fk_estante = e.id_estante
        WHERE (l.titulo ILIKE $1 OR l.isbn ILIKE $1 OR l.codigo ILIKE $1  OR a.nombre ILIKE $1 OR  pc.nombre ILIKE $1)
      `;
      if (carrera) {
        query += ' AND c.id_carrera = $'+n;
        params.push(carrera);
        n++ 
      }
      if(tipo){
        query += ' AND l.fk_tipo = $'+n;
        params.push(tipo);
        n++ 
      }
      if(estante){
        query += ' AND e.id_estante = $'+n;
        params.push(estante);
        n++ 
      }
      if(seccion){
        query += ' AND s.id_seccion = $'+n;
        params.push(seccion);
        n++ 
      }
      const index = await this.sql.query(`
      select COUNT(*) from (
        ${query} 
      ) as sub
      `,params) 

      params.push(pageSize)  
      params.push(offset)  

      query += ' LIMIT $'+(n++)+' OFFSET $'+(n++);
      result = await this.sql.query(query, params);
      return {items:index [0],result: result};
      
    } catch (error) {
      return new MessageDto(`Error al buscar los libros, error: ${error}`);
    }
  }
}
