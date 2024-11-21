import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

import * as fs from 'fs';
import * as path from 'path';

import * as sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

import { PalabrasClaveService } from 'src/administrador/palabras-clave/palabras-clave.service';
import { MessageDto } from 'src/common/message.dto';
import { edit_libro } from './editar';
import { Libro } from './libro.interface';


@Injectable()
export class LibroService {

    constructor(private readonly sql: SqlService, private palabra:PalabrasClaveService) {

    }




  async pagination(nombre:string){

  return await this.sql.query('SELECT COUNT(*) FROM libros.libro where fk_creador = $1;',[nombre])
}

    async traer(nombre: string , pagina:number): Promise<any> {
      const pageNumber = pagina; 
      const pageSize = 18; 
      const offset = (pageNumber - 1) * pageSize;
        
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
            l.id_libro, l.titulo, l.year_of_publication, l.review, l.imagen, a.nombre, c.nombre, l.nombre_archivo   
        LIMIT 
            $2 OFFSET $3  ;
        `
            , [nombre,pageSize, offset])
        return reslut


    }

    async by_id(id: number): Promise<any> {

      //consultar  tablas de seccion y estante , ponerlas  en el join y llevarlas para ver quie c  hace 
        try {
            const reslut = await this.sql.query(`
            select
            l.review ,
            l.year_of_publication,
            l.id_libro ,
            l.imagen, 
            l.nombre_archivo ,
            l.titulo,
            l.isbn,
            l.cantidad,
            l.editorial,
            l.codigo,
            e.nombre as estante,
            s.nombre as seccion,
            a.nombre as autor,
            p.nombre as profesor,
            c.nombre as carrera,
            t.nombre as tipo
            from libros.libro as l right join inst.usuario as p on p.id_user = l.fk_creador
            right join libros.autor as a on l.fk_autor = a.id_autor
            right join libros.carrera as c on l.fk_carrera = c.id_carrera  
            LEFT JOIN libros.tipo as t on l.fk_tipo = t.id_tipo 
            LEFT JOIN libros.seccion as s ON l.fk_seccion = s.id_seccion
            LEFT JOIN libros.estante as e ON s.fk_estante = e.id_estante
            where id_libro = ($1)`, [id])
            if (reslut.length === 0) {
                return "no existe el id de esta carrera "
            } else { return reslut }
        } catch (error) {
            return error
        }


    }


    async crear(libros:Libro, file: Express.Multer.File,imagenfile?: Express.Multer.File ): Promise<string> {
        const libro = libros
        

      const v_autor =   await this.sql.query('select id_autor from libros.autor where nombre = $1',[libro.fk_autor])
      
        if(!v_autor[0]){
          const c_autor = await this.sql.query('insert into libros.autor(nombre) values($1) RETURNING id_autor',[libro.fk_autor])
          libro.fk_autor = c_autor[0].id_autor
        }else{

          libro.fk_autor = v_autor[0].id_autor
        }


        if(imagenfile){
       
        const imagenname=  this.generateUniqueFileName(imagenfile)

          await this.saveFile(imagenfile, imagenname, process.env.Docs);
          libro.imagen = imagenname
        }        
     


        if(libro.tipo === '2'){
        try {
           
            let uniqueFileName
            if(file){
                 uniqueFileName = this.generateUniqueFileName(file);
            
                await this.saveFile(file, uniqueFileName, process.env.Docs);
            }
           const valor =  await this.sql.query(`INSERT INTO libros.libro (
                titulo,
                year_of_publication,
                review,
                imagen,
                nombre_archivo ,
                isbn,
                fk_creador,
                fk_autor,
                fk_carrera,
                fk_tipo,
                codigo,
                editorial
                ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12) RETURNING id_libro;`, [
                libro.titulo,
                2004,
                libro.descripcion,
                libro.imagen,
                uniqueFileName,
                libro.isbn,
                libro.fk_creador,
                libro.fk_autor,
                libro.fk_carrera,
                libro.tipo,
                libro.codigo,
                libro.editorial
               
            ]);
            this.palabra.Generar_palabras(libro.palabras, valor[0].id_libro)

            return 'Libro creado exitosamente';
        } catch (error) {
            console.error('Error al crear el libro con PDF:', error);
            return error
          //  throw new HttpException(`Error al crear el libro con PDF: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        }else if(libro.tipo ==='1')
        {
           

            const archivo_url = this.getDriveFileId(libro.archivo_url);
            if(!archivo_url){

            var url = libro.archivo_url
            }else{
                 url = `https://drive.google.com/uc?id=${archivo_url}`
            }
   

    const valor =    await this.sql.query(`INSERT INTO libros.libro (
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
                ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12)RETURNING id_libro;`, [
                libro.titulo,
                2004,
                libro.descripcion,
                libro.imagen,
                url,
                libro.isbn,
                libro.fk_creador,
                libro.fk_autor,
                libro.fk_carrera,
                libro.tipo, 
                libro.codigo,
                libro.editorial
               
            ]);
            this.palabra.Generar_palabras(libro.palabras, valor[0].id_libro)

            return 'Libro creado exitosamente';

        } else if(libro.tipo ==='3'){
          try{
  const valor =  await this.sql.query(`INSERT INTO libros.libro (
                titulo,
                year_of_publication,
                review,
                imagen,
                nombre_archivo ,
                isbn,
                fk_creador,
                fk_autor,
                fk_carrera,
                fk_tipo,
                codigo,
                editorial,
                cantidad
                ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13) RETURNING id_libro;`, [
                libro.titulo,
                2004,
                libro.descripcion,
                libro.imagen,
                null,
                libro.isbn,
                libro.fk_creador,
                libro.fk_autor,
                libro.fk_carrera,
                libro.tipo,
                libro.codigo,
                libro.editorial,
                libro.cantidad

               
            ]);
            this.palabra.Generar_palabras(libro.palabras, valor[0].id_libro)


          }catch (error) {
            console.error('Error al crear el libro con PDF:', error);
            return error
        }


        }
        

        
    }



    async eliminar(id: string) {


        try {

            
            await this.sql.query('DELETE FROM  libros.libro WHERE  id_libro = $1;', [id])
            return { mesage: 'eliminado ' }

        } catch (error) {
            return error
        }
    }
        async   editar(libro:edit_libro,files: { image: Express.Multer.File[], file?: Express.Multer.File[] }) {
    //crear interfaz
            try {
                const baseFolderPath = process.env.Docs ;
                let uniqueImageName 
                let uniqueFileName
if(files.file){

     uniqueFileName = this.generateUniqueFileName(files.file[0]);

    await this.saveFile(files.file[0], uniqueFileName, baseFolderPath);
}
if(files.image){
     uniqueImageName = this.generateUniqueFileName(files.image[0]);
     
     try{
    await this.saveFile(files.image[0], uniqueImageName, baseFolderPath);

     }catch(e){console.log(e)}
}
               
          
                 
if(uniqueImageName && uniqueFileName){
                await this.sql.query( `
                UPDATE libros.libro
                SET
                  review = $1,
                  year_of_publication = $2,
                  imagen = $3,
                  nombre_archivo = $4,
                  titulo = $5,
                  isbn = $6,
                  editorial = $7,
                  codigo = $8,
                  fk_carrera = $9
                WHERE
                  id_libro = $10;
              `,[libro.review,libro.year_of_publication,uniqueImageName,uniqueFileName,libro.titulo,libro.isbn,libro.editorial,libro.codigo,libro.carrera,libro.id_libro])
        }else if(!uniqueFileName && uniqueImageName)  {
            await this.sql.query( `
            UPDATE libros.libro
            SET
              review = $1,
              year_of_publication = $2,
              imagen = $3,
              titulo = $4,
              isbn = $5,
              editorial = $6,
              codigo = $7,
              fk_carrera = $8
            WHERE
              id_libro = $9;
          `,[libro.review,libro.year_of_publication,uniqueImageName,libro.titulo,libro.isbn,libro.editorial,libro.codigo,libro.carrera,libro.id_libro])
        }else if(!uniqueImageName && uniqueFileName){
            await this.sql.query( `
            UPDATE libros.libro
            SET
              review = $1,
              year_of_publication = $2,
              
              nombre_archivo = $3,
              titulo = $4,
              isbn = $5,
              editorial = $6,
              codigo = $7,
              fk_carrera = $8
            WHERE
              id_libro = $9;
          `,[libro.review,libro.year_of_publication,uniqueFileName,libro.titulo,libro.isbn,libro.editorial,libro.codigo,libro.carrera,libro.id_libro])
        }else{
            await this.sql.query( `
            UPDATE libros.libro
            SET
              review = $1,
              year_of_publication = $2,
              titulo = $3,
              isbn = $4,
              editorial = $5,
              codigo = $6,
              fk_carrera = $7
            WHERE
              id_libro = $8;
          `,[libro.review,libro.year_of_publication,libro.titulo,libro.isbn,libro.editorial,libro.codigo,libro.carrera,libro.id_libro])

        }
                

            } catch (error) {
                return error
            }

           return  new MessageDto('libro editado exitosamente')
    }

    private generateUniqueFileName(file: Express.Multer.File): string {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
      // Cambia la extensión a .webp si el archivo es una imagen
      const extension = file.mimetype.startsWith('image/') ? '.webp' : path.extname(file.originalname);
    
      return file.fieldname + '-' + uniqueSuffix + extension;
    }
    
    
      // private async saveFile(file: Express.Multer.File, fileName: string, baseFolderPath: string): Promise<void> {
      //   const filePath = path.join(baseFolderPath, fileName); // Ruta completa del archivo
    
      //   // Utiliza fs.createWriteStream para guardar el archivo
      //   const writer = fs.createWriteStream(filePath);
      //   writer.write(file.buffer);
      //   writer.end();
    
      //   return new Promise((resolve, reject) => {
      //     writer.on('finish', resolve);
      //     writer.on('error', reject);
      //   });
      // }

      private async saveFile(file: Express.Multer.File, fileName: string, baseFolderPath: string): Promise<void> {
        // Verifica el tipo de archivo
        if (file.mimetype.startsWith('image/')) {
          // Cambia la extensión del archivo a .webp
          fileName = fileName.replace(/\.[^.]+$/, '.webp'); // Reemplaza la extensión por .webp
          const filePath = path.join(baseFolderPath, fileName);
      
          // Convierte y comprime la imagen a formato WebP
          const imageBuffer = await sharp(file.buffer)
            .resize({ width: 1000 }) // Ajusta el tamaño máximo si lo deseas
            .webp({ quality: 80 }) // Convierte y comprime la imagen a formato WebP con calidad 80
            .toBuffer();
      
          // Guarda el archivo comprimido
          return fs.promises.writeFile(filePath, imageBuffer);
        
        } else if (file.mimetype === 'application/pdf') {
          const filePath = path.join(baseFolderPath, fileName);
      
          // Carga y comprime el PDF utilizando pdf-lib
          const pdfDoc = await PDFDocument.load(file.buffer);
          pdfDoc.setTitle('Compressed PDF'); // Opcional: modifica los metadatos
      
          // Guarda el PDF comprimido
          const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
          return fs.promises.writeFile(filePath, pdfBytes);
      
        } else {
          // Guarda otros tipos de archivos sin cambios
          const filePath = path.join(baseFolderPath, fileName);
          const writer = fs.createWriteStream(filePath);
          writer.write(file.buffer);
          writer.end();
      
          return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
          });
        }
      }



    getDriveFileId(link: string): string | null {
        const startIndex = link.indexOf('/d/') + 3; // Sumamos 3 para omitir "/d/"
        const endIndex = link.indexOf('/view');
    
        // Verificar que las subcadenas "/d/" y "/view" estén presentes en el enlace
        if (startIndex !== -1 && endIndex !== -1) {
          return link.substring(startIndex, endIndex);
        } else {
          // Si no se encuentran las subcadenas esperadas, devolver null o manejar el error según tus necesidades
          return null;
        }
      }

}
