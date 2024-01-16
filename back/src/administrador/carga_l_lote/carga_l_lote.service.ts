// carga-l-lote.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import { PalabrasClaveService } from '../palabras-clave/palabras-clave.service';
@Injectable()
export class CargaLLoteService {
  constructor(private readonly sql: SqlService , private palabra:PalabrasClaveService) {
  }
  async descargarArchivo(dato: any, id: string): Promise<void> {
    const directorioDestino = process.env.Docs;

    if (!directorioDestino) {
      throw new NotFoundException(new MessageDto('La variable de entorno Docs no está configurada'));      
    }

    const googleDriveFileId = this.getDriveFileId(dato.archivo);
    const imagen_url = this.getDriveFileId(dato.imagen);
    if(imagen_url){
      var imagen = `https://drive.google.com/uc?id=${imagen_url}`

    }
    else{
      imagen = dato.imagen
    }
    const url = `https://drive.google.com/uc?id=${googleDriveFileId}`;

    try {
      // Verifica si el directorio de destino existe, y créalo si no
      if (!fs.existsSync(directorioDestino)) {
        fs.mkdirSync(directorioDestino, { recursive: true });
      }

      // Realiza la solicitud http
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        
      });

      // Obtiene el nombre del archivo original del encabezado de respuesta
      const contentDisposition = response.headers['content-disposition'];
      const matches = contentDisposition.match(/filename="(.+)"$/);
      const nombreOriginal = matches ? matches[1] : `${Date.now()}-${googleDriveFileId}.pdf`;

      // Ruta completa del archivo
      const filePath = path.join(directorioDestino, nombreOriginal);

      // Guarda el archivo en el sistema de archivos local
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      // ponder en el mapeo de exel esta made de fk_autor,_fk:carrera_fktipo
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
        dato.titulo,
        dato.year,
        dato.review,
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


      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new NotFoundException(new MessageDto('Error al descargar o guardar el archivo'));     
    }
  }


  // funcion que guarda el libro completo  nts no descarga simon :·   
  async Sin_Descarga( dato:any , id ){

    try{
      const googleDriveFileId = this.getDriveFileId(dato.archivo);
    const imagen_url = this.getDriveFileId(dato.imagen);
    

    const imagen = `https://drive.google.com/uc?id=${imagen_url}`
    const url = `https://drive.google.com/uc?id=${googleDriveFileId}`;
    

      
      const valor =   await this.sql.query(`INSERT INTO libros.libro (
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
        dato.titulo,
        dato.year,
        dato.review,
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
      
 
    }catch(error){
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

  async libros_bloque(dato: any, id: string): Promise<void> {
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
//console.log(dato)
      if(nombre_tipo ==='URL'){

       
     await this.Sin_Descarga(dato,id)


      }
      else if(nombre_tipo === 'PDF'){
        await this.descargarArchivo(dato, id);
      }
      // Descargar el archivo
     //
    } catch (error) {      
      throw new NotFoundException(new MessageDto('Error en la función libros_bloque'));
    }
  }
  

}





