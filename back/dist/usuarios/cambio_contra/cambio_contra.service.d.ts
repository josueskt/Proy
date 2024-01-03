import { SqlService } from 'src/sql/sql.service';
export declare class CambioContraService {
    private sql;
    constructor(sql: SqlService);
    Contra(id: String, Contra: String): Promise<any>;
}
