import { SqlService } from 'src/sql/sql.service';
export declare class BuscadorService {
    private sql;
    constructor(sql: SqlService);
    buscar_libros(cadena: string, carrera: string): Promise<any>;
}
