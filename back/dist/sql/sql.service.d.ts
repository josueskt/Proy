export declare class SqlService {
    private readonly pool;
    user: string;
    host: string;
    database: string;
    password: string;
    port: string;
    constructor();
    query(sql: string, params?: any[]): Promise<any>;
}
