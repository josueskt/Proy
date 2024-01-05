import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

import * as pdfParse from 'pdf-parse';

import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class LibroService {

    constructor(private readonly sql: SqlService) {

    }

    async traer(nombre: String): Promise<any> {
        //as
        const reslut = await this.sql.query(
            `SELECT
            l.id_libro,
            l.titulo,
            l.year_of_publication,
            l.review,
            l.imagen,
            a.nombre as autor,
            c.nombre as carrera,
            l.nombre_archivo,
            COALESCE(COUNT(p.*), 0) as total_descargas
        FROM
            libros.libro as l
            INNER JOIN libros.carrera as c ON c.id_carrera = l.fk_carrera
            INNER JOIN libros.autor as a ON a.id_autor = l.fk_autor
            LEFT JOIN tramites.descargas as p ON p.fk_libro = l.id_libro
        WHERE
            l.fk_creador = $1
        GROUP BY
            l.id_libro, l.titulo, l.year_of_publication, l.review, l.imagen, a.nombre, c.nombre, l.nombre_archivo;
        `
            , [nombre])
        return reslut


    }

    async by_id(id: Number): Promise<any> {
        try {
            const reslut = await this.sql.query(`
            select
            l.review ,
            l.year_of_publication,
            l.id_libro ,
            l.imagen, 
            l.nombre_archivo ,
            
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


    async crear(libros, file: any): Promise<string> {
        const libro = JSON.parse(libros);
        console.log(libro)
        

        try {
            if (!file || !file.buffer) {
                throw new HttpException('Archivo no válido', HttpStatus.BAD_REQUEST);
            }
            const pdfBuffer = file.buffer;
            const data = await pdfParse(pdfBuffer);

            





            // Genera un nombre único para el archivo PDF
            const uniqueFileName = `${Date.now()}-${file.originalname}`;


            // Construye la ruta completa del archivo en la carpeta pdfs
            const pdfPath = path.join( process.env.Docs, uniqueFileName);

            // Crea el stream de escritura del archivo
            const writeStream = fs.createWriteStream(pdfPath);
            writeStream.write(file.buffer);

            // Cierra el flujo después de escribir el contenido
            writeStream.end();




            //  Inserta los datos del libro en la base de datos, utilizando el campo nombre_archivo
            await this.sql.query(`INSERT INTO libros.libro (
                titulo,
                year_of_publication,
                review,
                imagen ,
                nombre_archivo ,
                isbn ,
                fk_creador,
                fk_autor,
                fk_carrera,
                fk_tipo,
                codigo,
                editorial
                ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12)`, [
                libro.titulo,
                2004,
                libro.descripcion,
                libro.imagen,
                uniqueFileName,
                libro.isbn,
                libro.fk_creador,
                libro.fk_autor,
                libro.fk_carrera,
                libro.fk_tipo,
                libro.codigo,
                libro.editorial
               
            ]);

            return 'Libro creado exitosamente';
        } catch (error) {
            console.error('Error al crear el libro con PDF:', error);
            return error
          //  throw new HttpException(`Error al crear el libro con PDF: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    async eliminar(id: string) {


        try {

            await this.sql.query('DELETE FROM tramites.prestamo WHERE fk_libro = $1;', [id])
            await this.sql.query('DELETE FROM  libros.libro WHERE  id_libro = $1;', [id])
            return { mesage: 'eliminado ' }

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
