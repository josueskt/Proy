import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import { Libro } from './libro.interface';

import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class LibroService {

    constructor(private readonly sql: SqlService) {

    }

    async traer( nombre:String): Promise<any> {

        const reslut = await this.sql.query('select l.id_libro, l.titulo,l.fecha_publ,l.descripcion,l.imagen,a.nombre as autor,c.nombre as carrera , l.nombre_archivo from libros.libro as l  inner join libros.carrera as c  on c.id_carrera = l.fk_carrera inner join libros.autor as a  on a.id_autor = l.fk_autor  where fk_creador = ($1)' ,[nombre])
        return reslut


    }

    async by_id(id: Number): Promise<any> {
        try {
            const reslut = await this.sql.query(`
            select
            l.descripcion ,
            l.fecha_publ,
            l.id_libro ,
            l.imagen, 
            l.nombre_archivo ,
            l.num_paginas ,
            l.titulo,
            a.nombre as autor,
            p.nombre as profesor,
            c.nombre as carrera

            from libros.libro as l right join inst.usuario as p on p.id_user = l.fk_creador
            right join libros.autor as a on l.fk_autor = a.id_autor
            right join libros.carrera as c on l.fk_carrera = c.id_carrera   
            where id_libro = ($1)`, [id])
            if (reslut.length === 0) {
                return "no existe el id de esta carrera "
            } else { return reslut }
        } catch (error) {
            return error
        }


    }


    async crear(libros: any, file: any): Promise<string> {
      

        const libro = JSON.parse(libros);

        try {
            

            if (!file || !file.buffer) {
                throw new HttpException('Archivo no válido', HttpStatus.BAD_REQUEST);
              }
            // Genera un nombre único para el archivo PDF
           const uniqueFileName = `${Date.now()}-${file.originalname}`;
          

            // Construye la ruta completa del archivo en la carpeta pdfs
           const pdfPath = path.join('C:/Users/pc/Documents/4to_Software/Proy/back/src/pdfs', uniqueFileName);
        
            // Crea el stream de escritura del archivo
           const writeStream = fs.createWriteStream(pdfPath);
            writeStream.write(file.buffer);

// Cierra el flujo después de escribir el contenido
            writeStream.end();
        
              
            // Guarda el archivo en la carpeta pdfs con el nuevo nombre
       
 
          //  Inserta los datos del libro en la base de datos, utilizando el campo nombre_archivo
           await this.sql.query('INSERT INTO libros.libro (titulo, fecha_publ, descripcion, num_paginas, fk_creador, fk_autor, fk_carrera, nombre_archivo , imagen) VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7,$8)', [
               libro.titulo, libro.descripcion, libro.num_paginas, libro.fk_creador, libro.fk_autor, libro.fk_carrera, uniqueFileName,libro.imagen
           ]);

            return 'Libro creado exitosamente';
        } catch (error) {
           


            console.error('Error al crear el libro con PDF:', error);
            throw new HttpException(`Error al crear el libro con PDF: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    async eliminar(id: string) {


        try {
            await this.sql.query('delete from  libros.libro where  id_libro = ($1)', [id])
            return {mesage :'eliminado '}

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
