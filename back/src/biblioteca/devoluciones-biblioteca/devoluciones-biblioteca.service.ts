import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import { Prestamo } from '../prestamos/prestamo.interface';

@Injectable()
export class DevolucionesBibliotecaService {
  constructor(private sql: SqlService) { }

  async entrega(prestamo: Prestamo) {
    try {

      const res = await this.sql.query('select cantidad from libros.libro where id_libro = $1', [prestamo.fk_libro])

      const re2 = await this.sql.query('select * FROM tramites.prestamo_libro where id_prestamo = $1 and fk_estado !=3', [prestamo.id_prestamo])



      const valor = res[0].cantidad + 1
      if (re2[0]) {



        await this.sql.query('UPDATE libros.libro SET cantidad =$1 WHERE id_libro = $2', [valor, prestamo.fk_libro])

        await this.sql.query('UPDATE tramites.prestamo_libro SET observaciones = $1 ,feha_real_devolcion = CURRENT_TIMESTAMP , fk_estado = $2 where id_prestamo = $3 ', [prestamo.observacion, 3, prestamo.id_prestamo])


        return new MessageDto("devolicion exitosa exitoso")

      } else {
        return new MessageDto("libro ya devueto o sin tramite de prestamo pendienteo activo")

      }

    } catch (error) { return error }




  }

  traer_devolucion_disponibles(busqueda: string) {
    return this.sql.query(`
            SELECT 
            p.id_prestamo ,
            c.nombre ,
            c.id_user,
            b.titulo ,
            b.id_libro,
            b.codigo
            FROM tramites.prestamo_libro as p
            RIGHT JOIN  inst.usuario  as c
            ON p.fk_usuario = c.id_user
            LEFT JOIN libros.libro as b 
            ON p.fk_libro = b.id_libro 
            WHERE ( LOWER(b.codigo) LIKE LOWER($1) or b.titulo like $1) 
            AND p.fk_estado != 3 `, [`%${busqueda}%`]);

  }
}
