import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class SalidaService {
    constructor(private sql:SqlService){}

    historial(){
        return this.sql.query('SELECT * FROM tramites.ingreso where hora_salida IS NOT NULL')

    }
    registar_salida(id_ingreso:string){
        try{
            return this.sql.query(' UPDATE tramites.ingreso SET hora_salida = CURRENT_TIMESTAMP WHERE id_ingreso = $1 ',[id_ingreso])
        }catch(e){
console.log(e)
        }

    }

    por_salir(){
        return this.sql.query('SELECT * FROM tramites.ingreso where hora_salida IS NULL')

    }
}
