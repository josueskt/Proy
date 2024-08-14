import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class SalidaService {
    constructor(private sql:SqlService){}

    historial(){
        //return this.sql.query('SELECT * FROM tramites.ingreso where hora_salida IS NOT NULL')
        return this.sql.query(`
    SELECT 
        i.hora_salida, 
        i.hora_entrada, 
        i.id_ingreso, 
        i.actividad_s, 
        p.nombre AS paralelo, 
        j.nombre AS jornada, 
        n.nombre AS nivel, 
        ac.nombre AS actividad  
    FROM 
        tramites.ingreso AS i
    INNER JOIN 
        biblioteca.paralelo AS p ON p.id_paralelo = i.fk_paralelo 
    INNER JOIN 
        biblioteca.jornada AS j ON j.id_jornada = i.fk_jornada 
    INNER JOIN 
        biblioteca.nivel AS n ON n.id_nivel = i.fk_nivel 
    INNER JOIN 
        biblioteca.actividades AS ac ON ac.id_actividad = i.fk_actividad
    where hora_salida IS NOT NULL
`);


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
