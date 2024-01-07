// carga-l-lote.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
@Injectable()
export class CargaLLoteService {
  constructor(private readonly sql: SqlService) {
  }
  async descargarArchivo(dato: any, id: string): Promise<void> {
    const directorioDestino = process.env.Docs;

    if (!directorioDestino) {
      throw new NotFoundException(new MessageDto('La variable de entorno Docs no está configurada'));      
    }

    const googleDriveFileId = this.getDriveFileId(dato.archivo);
    const imagen_url = this.getDriveFileId(dato.imagen);
    const imagen = `https://drive.google.com/uc?id=${imagen_url}`
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
      await this.sql.query(`INSERT INTO libros.libro (
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
        editorial) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12)`, [
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

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new NotFoundException(new MessageDto('Error al descargar o guardar el archivo'));     
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
      dato.autor = id_autor[0].id_autor
      dato.tipo = id_tipo[0].id_tipo

      // Descargar el archivo
      await this.descargarArchivo(dato, id);

    } catch (error) {      
      throw new NotFoundException(new MessageDto('Error en la función libros_bloque'));
    }
  }

}



