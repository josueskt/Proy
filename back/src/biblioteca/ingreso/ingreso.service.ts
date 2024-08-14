import { Injectable } from '@nestjs/common';
import { Ingreso } from './ingreso.interface';
import { SqlService } from 'src/sql/sql.service';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class IngresoService {
constructor(private sql:SqlService){}
    registro(ingreso:Ingreso){

this.sql.query('INSERT INTO tramites.ingreso(hora_entrada,fk_usuario,fk_actividad,fk_jornada,fk_paralelo,fk_nivel, actividad_s)VALUES(CURRENT_TIMESTAMP,$1,$2,$3,$4,$5,$6)',[ingreso.id_usuario,ingreso.actividad,ingreso.jornada,ingreso.paralelo,ingreso.nivel,ingreso.actividad_s])
return new MessageDto("listo")
    }


    traer_paralelo(){
      return  this.sql.query('SELECT * FROM biblioteca.paralelo')
    }
   
    traer_jornada(){
      return  this.sql.query('SELECT * FROM biblioteca.jornada')

    }
   
    traer_nivel(){
      return  this.sql.query('SELECT * FROM biblioteca.nivel')

    }
   
    traer_actividad(){
      return  this.sql.query('SELECT * FROM biblioteca.actividades')
      

    }


}
