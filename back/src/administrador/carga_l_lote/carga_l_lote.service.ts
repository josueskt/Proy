// carga-l-lote.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class CargaLLoteService {
  constructor(private readonly sql: SqlService) {
  }
  async descargarArchivo(dato:any , id:string): Promise<void> {
    const directorioDestino = process.env.Docs;

    if (!directorioDestino) {
      throw new Error('La variable de entorno Docs no está configurada');
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

      // Realiza la solicitud HTTP para descargar el archivo
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

     
      await this.sql.query('INSERT INTO libros.libro (titulo, fecha_publ, descripcion, num_paginas, fk_creador, fk_autor, fk_carrera, nombre_archivo , imagen) VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7,$8)', [
        dato.titulo, dato.descripcion, 0, id, 2, dato.carrera, nombreOriginal, imagen
    ]);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Error al descargar o guardar el archivo:', error);
      throw new Error('Error al descargar o guardar el archivo');
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
  


  async libros_bloque(dato: any , id:string): Promise<void> {
    try {

    
    
      // Descargar el archivo
    await this.descargarArchivo(dato ,id);
  
     
      
    } catch (error) {
      console.error('Error en la función libros_bloque:', error);
      
    }
  }
    
  }



