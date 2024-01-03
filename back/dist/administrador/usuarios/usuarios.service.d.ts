import { Usuario } from './usuario.interface';
import { SqlService } from 'src/sql/sql.service';
export declare class UsuariosService {
    sql: SqlService;
    constructor(sql: SqlService);
    delete_user(id: Number): Promise<{
        message: string;
    }>;
    register(usuarios: Usuario[]): Promise<string>;
    get_rol(): Promise<any>;
    get_usets(): Promise<any>;
}
