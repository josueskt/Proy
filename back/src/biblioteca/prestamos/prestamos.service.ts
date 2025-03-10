import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import { Prestamo } from './prestamo.interface';

@Injectable()
export class PrestamosService {
    constructor(private sql:SqlService){} 

    async usuarios(id:string){
 return await this.sql.query('SELECT email,fk_carrera,id_user,nombre from inst.usuario Where id_user=$1',[id])
    
}

    libros_disponibles(libro:string){


        const pageNumber = 1; 
    const pageSize = 20; 
    const offset = (pageNumber - 1) * pageSize;
    
    return this.sql.query(
        'SELECT * FROM libros.libro WHERE cantidad >= 0 AND ((codigo LIKE $1) OR (titulo LIKE $1) )  LIMIT $2 OFFSET $3',
        [`%${libro}%`, pageSize, offset]
    );
    
    
    
        
       }


       async prestamo(prestamo:Prestamo){

    

        try{
       
           const res = await this.sql.query('select cantidad from libros.libro where id_libro = $1 and fk_tipo =3',[prestamo.fk_libro])
           if(res[0].cantidad > 0){
               
               
               const valor = res[0].cantidad -1
               
       await this.sql.query('UPDATE libros.libro SET cantidad =$1 WHERE id_libro = $2',[valor,prestamo.fk_libro])
       
       await this.sql.query('INSERT INTO tramites.prestamo_libro(fecha_reserva,fk_usuario,fk_libro,fk_estado)VALUES (CURRENT_TIMESTAMP,$1,$2,$3)',[prestamo.fk_cliente,prestamo.fk_libro,1])
       
       
           return new MessageDto("prestamo exitoso")
       
           }
           else{ return new MessageDto("lo sentimos no se pudo prestar")}
        }catch(error){
           return error}
       
          
       
       
       
       }


       async historial_prestamo(id:string){

        return  await this.sql.query('SELECT b.titulo, p.fecha_reserva,p.observaciones,c.id_user ,c.nombre , c.email FROM libros.libro as b LEFT JOIN tramites.prestamo_libro as p ON b.id_libro =p.fk_libro LEFT JOIN inst.usuario as c ON  p.fk_usuario = c.id_user where b.id_libro =$1',[id] )
        
        }
       

}
