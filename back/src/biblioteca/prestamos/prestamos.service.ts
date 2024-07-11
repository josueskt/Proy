import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import { Prestamo } from './prestamo.interface';

@Injectable()
export class PrestamosService {
    constructor(private sql:SqlService){} 

    async usuarios(id:string){
 return await this.sql.query('SELECT * from inst.usuario Where id_user=$1',[id])
    
}

    libros_disponibles(libro:string){


        const pageNumber = 1; // Número de página
    const pageSize = 20; // Tamaño de página (número de resultados por página)
    const offset = (pageNumber - 1) * pageSize;
    
    return this.sql.query(
        'SELECT * FROM libros.libro WHERE cantidad >= 0 AND LOWER(codigo) LIKE LOWER($1) LIMIT $2 OFFSET $3',
        [`%${libro}%`, pageSize, offset]
    );
    
    
    
        
       }


       async prestamo(prestamo:Prestamo){

    

        try{
       
           const res = await this.sql.query('select cantidad from libros.libro where id_libro = $1 and fk_tipo =3',[prestamo.fk_libro])
           if(res[0].cantidad > 0){
               
               
               const valor = res[0].cantidad -1
               
       await this.sql.query('UPDATE libros.libro SET cantidad =$1 WHERE id_libro = $2',[valor,prestamo.fk_libro])
       
       await this.sql.query('INSERT INTO tramites.prestamo_libro(fecha_prestamo,fk_usuario,fk_libro,fk_estado)VALUES (CURRENT_TIMESTAMP,$1,$2,$3)',[prestamo.fk_cliente,prestamo.fk_libro,1])
       
       
           return new MessageDto("prestamo exitoso")
       
           }
           else{ return new MessageDto("lo sentimos no se pudo prestar")}
        }catch(error){console.log(error)
           return error}
       
          
       
       
       
       }
       

}
