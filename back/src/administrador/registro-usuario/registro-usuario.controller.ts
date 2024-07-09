import { Body, Controller, Post } from '@nestjs/common';
import { RegistroUsuarioService } from './registro-usuario.service';
import { Usuario } from '../usuarios/usuario.interface';

@Controller('registro-usuario')
export class RegistroUsuarioController {


    constructor(private regis_S: RegistroUsuarioService) {

    }
    @Post()
    registrar(@Body('user') usuario: Usuario) {
        console.log(usuario)
        return this.regis_S.register(usuario)
    }
}
