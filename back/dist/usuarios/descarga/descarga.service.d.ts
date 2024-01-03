import { SqlService } from 'src/sql/sql.service';
export declare class DescargaService {
    private sql;
    constructor(sql: SqlService);
    descargados(id_user: string, libro_id: Number): Promise<any>;
}
