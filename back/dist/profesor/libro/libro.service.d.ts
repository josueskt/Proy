import { SqlService } from 'src/sql/sql.service';
export declare class LibroService {
    private readonly sql;
    constructor(sql: SqlService);
    traer(nombre: String): Promise<any>;
    by_id(id: Number): Promise<any>;
    crear(libros: any, file: any): Promise<string>;
    eliminar(id: string): Promise<any>;
    editar(id: Number, bod: String): Promise<any>;
}
