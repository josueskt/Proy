import { SqlService } from 'src/sql/sql.service';
export declare class NacionalidadService {
    private readonly sql;
    constructor(sql: SqlService);
    traer_naciolanlidad(): Promise<any>;
    crear_autor(nombre: String): Promise<any>;
    eliminar(id: Number): Promise<any>;
}
