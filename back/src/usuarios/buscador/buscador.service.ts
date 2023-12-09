import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class BuscadorService {
  constructor(private sql: SqlService) {}

  async buscar_libros(cadena: string, carrera: string) {
    try {
      let query = `
        SELECT l.id_libro, l.titulo ,l.nombre_archivo , l.fecha_publ , l.descripcion , l.imagen , l.num_paginas , c.nombre as nombre_carrera , a.nombre as autor_nombre
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        WHERE l.titulo LIKE $1
      `;

      const params = [`%${cadena}%`];

      // Agregar la condición de carrera solo si se proporciona un valor


      //cambiar esta ammada por  el id 
      if (carrera) {
        query += ' AND c.id_carrera = $2';
        params.push(carrera);
      }

      return await this.sql.query(query, params);
    } catch (error) {
      return error;
    }
  }
}
