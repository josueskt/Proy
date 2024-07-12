import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class BuscadorService {
  constructor(private sql: SqlService) {}

  async buscar_libros(cadena: string, carrera: string, page: number) {
    const pageNumber = page || 1;
    const pageSize = 12;
    const offset = (pageNumber - 1) * pageSize;
  
    // Los parámetros de la consulta
    let params = [`%${cadena}%`, pageSize, offset];
    let query: string;
    let result;
  
    try {
      // Consulta inicial que busca por título, ISBN y código
      query = `
        SELECT DISTINCT l.id_libro, l.titulo, l.nombre_archivo, l.year_of_publication, l.review, l.imagen,
                        c.nombre as nombre_carrera, a.nombre as autor_nombre, t.nombre as tipo
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        LEFT JOIN libros.tipo as t ON l.fk_tipo = t.id_tipo
        LEFT JOIN libros.palabras_libro as pl ON pl.fk_libro = l.id_libro
        LEFT JOIN libros.palabras_clave as pc ON pl.fk_palabra = pc.id_palabra
        WHERE (l.titulo ILIKE $1 OR l.isbn ILIKE $1 OR l.codigo ILIKE $1  OR a.nombre ILIKE $1 OR  pc.nombre ILIKE $1)
      `;
      
      // Si se especifica una carrera, se añade a la consulta
      if (carrera) {
        query += ' AND c.id_carrera = $4';
        params.push(carrera);
      }
      
      // Añadir paginación
      query += ' LIMIT $2 OFFSET $3';
  
      // Ejecutar la consulta
      result = await this.sql.query(query, params);
  
      return result;
    } catch (error) {
      return new MessageDto(`Error al buscar los libros, error: ${error}`);
    }
  }

  async index(cadena: string, carrera: string) {
    const params = [`%${cadena}%`];
    let query: string;
    let restul;

    try {
      // Consulta inicial que busca por título, ISBN y código
      query = `
        SELECT COUNT(*)
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        LEFT JOIN libros.tipo as t ON l.fk_tipo = t.id_tipo
        LEFT JOIN libros.palabras_libro as pl ON pl.fk_libro = l.id_libro
        LEFT JOIN libros.palabras_clave as pc ON pl.fk_palabra = pc.id_palabra
        WHERE (l.titulo ILIKE $1 OR l.isbn ILIKE $1 OR l.codigo ILIKE $1  OR a.nombre ILIKE $1 OR  pc.nombre ILIKE $1)
      `;
      
      // Si se especifica una carrera, se añade a la consulta
      if (carrera) {
        query += ' AND c.id_carrera = $2';
        params.push(carrera);
      }
      
      // Añadir paginación
      
  
      // Ejecutar la consulta
      restul = await this.sql.query(query, params);
  
      return restul;
    } catch (error) {
      return new MessageDto(`Error al buscar los libros, error: ${error}`);
    }
  }
}
