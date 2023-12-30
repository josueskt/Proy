import { SqlService } from 'src/sql/sql.service';
export declare class GetLibroService {
    private sql;
    constructor(sql: SqlService);
    libro_byid(id: Number): Promise<any>;
}
