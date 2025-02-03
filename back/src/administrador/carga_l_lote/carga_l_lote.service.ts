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
  async libros_bloque(dato: dato, id: string): Promise<void> {
    try {
      let id_autor = await this.sql.query('SELECT id_autor FROM libros.autor WHERE nombre = ($1)', [dato.autor])
      let id_tipo_libro = await this.sql.query('SELECT id FROM libros.tipo_libro WHERE nombre = ($1)', [dato.tipo_libro])
      let id_tipo = await this.sql.query('SELECT id_tipo FROM libros.tipo WHERE nombre = ($1)', [dato.medio])
      let id_editorial = await this.sql.query('SELECT id FROM libros.editorial WHERE nombre = ($1)', [dato.editorial])
      
      let id_carrera = await this.sql.query('SELECT id_carrera FROM libros.carrera WHERE nombre = ($1)', [dato.carrera])
      if (!id_autor[0]) {
       id_autor = await this.sql.query('INSERT INTO libros.autor(nombre) VALUES($1) RETURNING id_autor  ', [dato.autor])
      }
      if (!id_tipo_libro[0]) {
        id_tipo_libro= await this.sql.query('INSERT INTO libros.tipo_libro(nombre) VALUES($1) RETURNING id', [dato.tipo_libro])
      }
      if (!id_tipo[0]) {
        id_tipo =  await this.sql.query('INSERT INTO libros.tipo(nombre) VALUES($1) RETURNING id_tipo', [dato.medio])
      }
      if (!id_carrera[0]) {
        id_carrera =  await this.sql.query('INSERT INTO libros.carrera(nombre) VALUES($1) RETURNING id_carrera', [dato.carrera])
      }
      if (!id_editorial[0]) {
        id_editorial =  await this.sql.query('INSERT INTO libros.editorial(nombre) VALUES($1) RETURNING id', [dato.editorial])
      }
      const nombre_tipo = dato.medio
      dato.autor = id_autor[0].id_autor
      dato.medio = id_tipo[0].id_tipo
      dato.tipo_libro = id_tipo_libro[0].id
      dato.carrera = id_carrera[0].id_carrera
      dato.editorial = id_editorial[0].id
      switch (nombre_tipo) {
        case 'URL':
          await this.Sin_Descarga(dato, id);
          break;
        case 'PDF':
          await this.descargarArchivo(dato, id);
          break;
        case 'FISICO':
          await this.libro_fisico(dato, id)
          break;
        default:
      }
    } catch (error) {
      console.error(new MessageDto(`asdasdasderror ${error}`));
    }
  }
  async libro_fisico(dato: dato, id_user: string) {
    if (dato.imagen) {
      const imagen_url = this.getDriveFileId(dato.imagen);
      if (imagen_url) {
        var imagen = `https://drive.google.com/uc?id=${imagen_url}`
      }
      else {
        imagen = dato.imagen
      }
      const myPromise: Promise<string> = this.descargar_todo(imagen, this.directorioDestino);
      await myPromise
        .then((result: string) => {
          imagen = result
        })
        .catch((error) => {
          console.error(error);
        });
    } else { imagen = '' }
    const valor = await this.sql.query(`INSERT INTO libros.libro ( titulo, year_of_publication, review, imagen, nombre_archivo, isbn,fk_creador,fk_autor,fk_carrera,fk_tipo,codigo, fk_editorial,cantidad,kf_tipo_libro) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14)  RETURNING id_libro`, [
      dato.titulo.toLowerCase(), dato.fecha, dato.review?.toLowerCase(), imagen, '', dato.isbn, id_user, dato.autor, dato.carrera, dato.medio, dato.codigo, dato.editorial, dato.cantidad ,dato.tipo_libro 
    ]);
    if (dato.palabras) {
      this.palabra.Generar_palabras(dato.palabras, valor[0].id_libro)
    }
  }
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
      try {
        const myPromise: Promise<string> = this.descargar_todo(imagen, this.directorioDestino);
        await myPromise
          .then((result: string) => {
            imagen = result
          })
          .catch((error) => {
            console.error(error);
          });
        const myPromis: Promise<string> = this.descargar_todo(url, this.directorioDestino);
        await myPromis
          .then((result: string) => {
            nombreOriginal = result
          })
          .catch((error) => {
            console.error(error);
          });       } catch (error) {
        new NotFoundException(new MessageDto('Error al descargar o guardar el archivo'));
      }
      const valor = await this.sql.query(`INSERT INTO libros.libro (
        titulo,year_of_publication,review, imagen, nombre_archivo, isbn, fk_creador, fk_autor,fk_carrera,fk_tipo,codigo,fk_editorial,kf_tipo_libro) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13)  RETURNING id_libro`, [
        dato.titulo.toLowerCase(), dato.fecha, dato.review.toLowerCase(), imagen, nombreOriginal, dato.isbn, id, dato.autor, dato.carrera, dato.medio, dato.codigo, dato.editorial ,dato.tipo_libro
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
    const match = contentDispositionHeader.match(/filename="(.+)"$/);
    const nombreOriginal = match ? match[1] : 'archivo';
    let extensionOriginal = path.extname(nombreOriginal);
    if (!extensionOriginal) {
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
      const imagen = dato.imagen
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
        fk_editorial) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12) RETURNING id_libro`, [
        dato.titulo.toLowerCase(),
        dato.fecha,
        dato.review.toLowerCase(),
        imagen,
        url,
        dato.isbn,
        id,
        dato.autor,
        dato.carrera,
        dato.medio,
        dato.codigo,
        dato.editorial
      ]);
      this.palabra.Generar_palabras(dato.palabras, valor[0].id_libro)
    } catch (error) {
    }
  }
  getDriveFileId(link: string): string | null {
    const startIndex = link.indexOf('/d/') + 3;
    const endIndex = link.indexOf('/view');
    if (startIndex !== -1 && endIndex !== -1) {
      return link.substring(startIndex, endIndex);
    } else {
      return null;
    }
  }
} 