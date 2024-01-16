import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class EtiquetasService {
constructor(private sql: SqlService) { }


    async traer(id:number){
     const res =  await this.sql.query('SELECT pc.nombre , pc.id_palabra FROM libros.palabras_clave as pc INNER JOIN libros.palabras_libro as pl ON pc.id_palabra = pl.fk_palabra WHERE pl.fk_libro = $1',[id] );
     return res

}

}
