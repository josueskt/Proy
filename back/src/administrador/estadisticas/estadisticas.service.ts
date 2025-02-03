import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service'; @Injectable()
export class EstadisticasService { constructor( public sql:SqlService){} async historial_iniciados(){     try {
       return await this.sql.query('select fecha from  inst.secion order by fecha')    } catch (error) {
       return error
   } } async historial_prestamos(){     try {
       return await this.sql.query('SELECT fecha_reserva fecha FROM tramites.prestamo_libro')    } catch (error) {
       return error
   } } 
   async informe(fecha_inicio,fecha_fin){     try {
    return await this.sql.query(
        `SELECT 
           fecha, 
           email, 
           id_user AS cedula, 
           nombre_rol AS rol, 
           b.nombre AS usuario, 
           d.nombre AS carrera 
         FROM 
           inst.secion a 
         INNER JOIN 
           inst.usuario b ON a.fk_user = b.id_user 
         INNER JOIN 
           inst.rol c ON b.fk_rol = c.id_rol 
         LEFT JOIN 
           libros.carrera d ON b.fk_carrera = d.id_carrera 
         WHERE 
           fecha BETWEEN $1 AND $2`,
        [fecha_inicio, fecha_fin]
      );
      
      } catch (error) {
       return error
   } }

   async informe_prestamo(fecha_inicio,fecha_fin){     try {
    return await this.sql.query(
        `SELECT  fecha_reserva , feha_real_devolcion , observaciones , b.nombre , c.codigo , c.titulo from tramites.prestamo_libro a
        left join inst.usuario b on a.fk_usuario = b.id_user
        LEFT JOIN libros.libro c on a.fk_libro = c.id_libro
         WHERE 
           feha_real_devolcion BETWEEN $1 AND $2`,
        [fecha_inicio, fecha_fin]
      );
      
      } catch (error) {
       return error
   } }



}
