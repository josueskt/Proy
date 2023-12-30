import { SqlService } from 'src/sql/sql.service';
export declare class EstadisticasService {
    sql: SqlService;
    constructor(sql: SqlService);
    historial_iniciados(): Promise<any>;
}
