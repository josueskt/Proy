import { SqlService } from 'src/sql/sql.service';
export declare class CarreraService {
    private readonly sql;
    constructor(sql: SqlService);
    traer(): Promise<any>;
    by_id(id: Number): Promise<any>;
    crear(mod: any): Promise<any>;
    eliminar(id: Number): Promise<any>;
    editar(id: Number, bod: any): Promise<any>;
}
