import { SqlService } from 'src/sql/sql.service';
export declare class CargaLLoteService {
    private readonly sql;
    constructor(sql: SqlService);
    descargarArchivo(dato: any, id: string): Promise<void>;
    getDriveFileId(link: string): string | null;
    libros_bloque(dato: any, id: string): Promise<void>;
}
