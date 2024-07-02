// carga-l-lote.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import { PalabrasClaveService } from '../palabras-clave/palabras-clave.service';
import { dato } from './dato';

@Injectable()
export class CargaLLoteService {



  constructor(private readonly sql: SqlService, private palabra: PalabrasClaveService) {
  }
   directorioDestino = process.env.Docs;
  async descargarArchivo(dato: dato, id: string): Promise<void> {
  
    var nombreOriginal

    if (!this.directorioDestino) {
      throw new NotFoundException(new MessageDto('La variable de entorno Docs no está configurada'));
    }

    const googleDriveFileId = this.getDriveFileId(dato.archivo);
    const imagen_url = this.getDriveFileId(dato.imagen);
    if (imagen_url) {
      var imagen = `https://drive.google.com/uc?id=${imagen_url}`

    }
    else {
      
      imagen = dato.imagen
    }
    const url = `https://drive.google.com/uc?id=${googleDriveFileId}`;
 

    try {

      if (!fs.existsSync(this.directorioDestino)) {
        fs.mkdirSync(this.directorioDestino, { recursive: true });
      }

      try{

        const myPromise: Promise<string> = this.descargar_todo(imagen, this.directorioDestino);

         await myPromise
          .then((result: string) => {
         imagen = result
           
            
          })
          .catch((error) => {
           
            console.error(error);
          });
  
          const myPromis: Promise<string> = this.descargar_todo(url, this.directorioDestino);
  
          await  myPromis
            .then((result: string) => {
              nombreOriginal = result
            
            })
            .catch((error) => {
              console.error(error);
            });

      }catch(error){
         new NotFoundException(new MessageDto('Error al descargar o guardar el archivo'));
      }



      const valor =  await this.sql.query(`INSERT INTO libros.libro (
        titulo,
        year_of_publication,
        review,
        imagen,
        nombre_archivo,
        isbn,
        fk_creador,
        fk_autor,
        fk_carrera,
        fk_tipo,
        codigo,
        editorial) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12)  RETURNING id_libro`, [
        dato.titulo.toLowerCase(),
        dato.year,
        dato.review.toLowerCase(),
        imagen,
        nombreOriginal,
        dato.isbn,
        id,
        dato.autor,
        dato.carrera,
        dato.tipo,
        dato.codigo,
        dato.editorial

      ]);


     this.palabra.Generar_palabras(dato.palabras, valor[0].id_libro)

 

    } catch (error) {
      throw new NotFoundException(new MessageDto('Error al guardar el la base '));
    }
  }

  async descargar_todo(url, destino) {

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
   
    const contentDispositionHeader = response.headers['content-disposition'];
    if (!contentDispositionHeader) {

  }

   // Obtener la extensión del archivo desde la URL
   const match = contentDispositionHeader.match(/filename="(.+)"$/);
   const nombreOriginal = match ? match[1] : 'archivo';


   let extensionOriginal = path.extname(nombreOriginal);
   if(!extensionOriginal){
    extensionOriginal = '.webp'
   }
   const nombreUnico = `archivo_${Date.now()}${extensionOriginal}`;

    const rutaCompleta = path.join(destino, nombreUnico);

    const writer = fs.createWriteStream(rutaCompleta);
    response.data.pipe(writer);

    

return nombreUnico

  }
  
  async Sin_Descarga(dato: dato, id) {

    try {
      const googleDriveFileId = this.getDriveFileId(dato.archivo);
      const imagen_url = this.getDriveFileId(dato.imagen);


      const imagen = `https://drive.google.com/uc?id=${imagen_url}`
      const url = `https://drive.google.com/uc?id=${googleDriveFileId}`;



      const valor = await this.sql.query(`INSERT INTO libros.libro (
        titulo,
        year_of_publication,
        review,
        imagen,
        nombre_archivo,
        isbn,
        fk_creador,
        fk_autor,
        fk_carrera,
        fk_tipo,
        codigo,
        editorial) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12) RETURNING id_libro`, [
        dato.titulo.toLowerCase(),
        dato.year,
        dato.review.toLowerCase(),
        imagen,
        url,
        dato.isbn,
        id,
        dato.autor,
        dato.carrera,
        dato.tipo,
        dato.codigo,
        dato.editorial

      ]);

      this.palabra.Generar_palabras(dato.palabras, valor[0].id_libro)


    } catch (error) {
      throw error

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

  async libros_bloque(dato: dato, id: string): Promise<void> {
    try {

      let id_autor = await this.sql.query('SELECT id_autor FROM libros.autor WHERE nombre = ($1)', [dato.autor])
      const id_tipo = await this.sql.query('SELECT id_tipo FROM libros.tipo WHERE nombre = ($1)', [dato.tipo])

      if (!id_autor[0]) {
        await this.sql.query('INSERT INTO libros.autor(nombre) VALUES($1)', [dato.autor])
        id_autor = await this.sql.query('SELECT id_autor FROM libros.autor WHERE nombre = ($1)', [dato.autor])

      }
      const nombre_tipo = dato.tipo
      dato.autor = id_autor[0].id_autor
      dato.tipo = id_tipo[0].id_tipo

      if (nombre_tipo === 'URL') {
        await this.Sin_Descarga(dato, id)
      }
      else if (nombre_tipo === 'PDF') {
        await this.descargarArchivo(dato, id);
      }
      else if(nombre_tipo ==='FISICO'){
        
      }
     
    } catch (error) {
      console.error(new MessageDto(`error ${error}`));
    }
  }


}





