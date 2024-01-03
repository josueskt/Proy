import { UsuariosService } from './usuarios.service';
import { RegisterUser } from 'src/dto/user.dto';
export declare class UsuariosController {
    private user;
    constructor(user: UsuariosService);
    Get_rol(): Promise<any>;
    register(usuarios: RegisterUser[]): Promise<string>;
    eliminar(id: Number): Promise<{
        message: string;
    }>;
}
