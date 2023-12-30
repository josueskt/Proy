import { login } from './login.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private Login;
    constructor(Login: LoginService);
    login(datos: login): Promise<{
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
