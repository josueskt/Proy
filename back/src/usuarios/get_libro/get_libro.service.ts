import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class GetLibroService {
  constructor(private sql: SqlService) {}

  async libro_byid(id: number) {
    try {
      const reslut = await this.sql.query(
        'select l.titulo , l.year_of_publication , l.review, l.imagen , l.nombre_archivo, a.nombre from libros.libro as l INNER JOIN libros.autor as a ON a.id_autor =  l.fk_autor  where id_libro = ($1)',
        [id],
      );
      return reslut;
    } catch (error) {
      return new NotFoundException(
        new MessageDto(`Error al buscar el libro, error: ${error}`)
      );
    }
  }
}
