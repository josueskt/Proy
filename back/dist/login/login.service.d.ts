import { SqlService } from 'src/sql/sql.service';
import { login } from './login.dto';
export declare class LoginService {
    sql: SqlService;
    private readonly jwtSecretKey;
    constructor(sql: SqlService);
    Login(datos: login): Promise<{
        token: any;
        message?: undefined;
        error?: undefined;
    } | {
        message: string;
        token?: undefined;
        error?: undefined;
    } | {
        message: string;
        error: any;
        token?: undefined;
    }>;
}
