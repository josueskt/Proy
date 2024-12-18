import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class SalidaService {
    constructor(private sql:SqlService){}

    historial(){
        return this.sql.query(`
        SELECT 
        i.hora_salida, 
        i.hora_entrada, 
        i.id_ingreso, 
        i.actividad_s, 
        p.nombre AS paralelo, 
        j.nombre AS jornada, 
        n.nombre AS nivel, 
        email , u.nombre usuario,
        c.nombre carrera ,
        ac.nombre AS actividad  
    FROM 
        tramites.ingreso AS i
    left JOIN 
        biblioteca.paralelo AS p ON p.id_paralelo = i.fk_paralelo 
        left JOIN 
        biblioteca.jornada AS j ON j.id_jornada = i.fk_jornada 
        left JOIN 
        biblioteca.nivel AS n ON n.id_nivel = i.fk_nivel 
        left JOIN 
        biblioteca.actividades AS ac ON ac.id_actividad = i.fk_actividad
        left join inst.usuario u ON u.id_user = i.fk_usuario 
        left JOIN  libros.carrera c ON u.fk_rol = c.id_carrera
    where hora_salida IS NOT NULL
    ORDER BY id_ingreso DESC
    
`);


    }
    registar_salida(id_ingreso:string){
        try{
            return this.sql.query(' UPDATE tramites.ingreso SET hora_salida = CURRENT_TIMESTAMP WHERE id_ingreso = $1 ',[id_ingreso])
        }catch(e){
        }

    }

    por_salir(){
        return this.sql.query('SELECT * FROM tramites.ingreso where hora_salida IS NULL')

    }
}
