import { SqlService } from 'src/sql/sql.service';
export declare class MateriaService {
    sql: SqlService;
    constructor(sql: SqlService);
    trae(): Promise<any>;
    by_id(id: Number): Promise<any>;
    crear(bod: any): Promise<any>;
    editar(id: Number, bod: any): Promise<any>;
    eliminar(id: Number): Promise<any>;
}
