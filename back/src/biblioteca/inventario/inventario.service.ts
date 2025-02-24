import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class InventarioService {
    constructor(private sql:SqlService){}
    traer_fisicos(codigo:string , pagina:number){

        const pageNumber = pagina; 
        const pageSize = 18; 
        const offset = (pageNumber - 1) * pageSize;
        return this.sql.query(
            'SELECT * FROM libros.libro WHERE fk_tipo = 3 AND ((codigo LIKE $1) OR (titulo LIKE $1)) LIMIT $2 OFFSET $3;',
            [`%${codigo}%`, pageSize, offset]
          );
          
    }

  

}
