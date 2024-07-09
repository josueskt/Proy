import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import { estante } from './estante.interface';
import { error } from 'console';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class EstantesService {

constructor(private sql:SqlService){}


async traer(){
     return await this.sql.query('select * from libros.estante')
}
 async crear(estante:estante){
    try{
await this.sql.query('INSERT INTO libros.estante(nombre)VALUES($1)',[estante.nombre])
    }catch(error){
return error
    }
}

async editar(estante){
    this.sql.query('UPDATE libros.estante set nombre = $1 WHERE id_estante=$2',[estante.nombre,estante.id_estante])
    return new MessageDto('actualizado exitosamente' );

}
eliminar(id:string){
    this.sql.query('DELETE FROM libros.estante WHERE = $1',[id])
    return new MessageDto('eliminadoexitosamente' );

}

}
