import { SqlService } from 'src/sql/sql.service';
export declare class TestController {
    private readonly sql;
    constructor(sql: SqlService);
    traer(): Promise<any>;
    guardad(): Promise<void>;
}
