import { SqlService } from 'src/sql/sql.service';
export declare class AutorService {
    private readonly sql;
    constructor(sql: SqlService);
    traer(): Promise<any>;
    crear_autor(nombre: String, nacionalidad: Number): Promise<any>;
    eliminar(id: number): Promise<any>;
}
