import { Injectable } from '@nestjs/common';
import { Ingreso } from './ingreso.interface';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class IngresoService {
constructor(private sql:SqlService){}
    registro(ingreso:Ingreso){

this.sql.query('INSERT INTO tramites.ingreso(hora_entrada,fk_usuario,fk_actividad,fk_jornada,fk_paralelo)VALUES(CURRENT_TIMESTAMP,$1,$2,$3,$4,)',[])

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
      return  this.sql.query('SELECT * FROM biblioteca.actividad')

    }


}
