import { Body, Controller, Post } from '@nestjs/common';
import { RegistroUsuarioService } from './registro-usuario.service';
import { Usuario } from '../usuarios/usuario.interface';

@Controller('registro-usuario')
export class RegistroUsuarioController {
    constructor(private regis_S: RegistroUsuarioService) {
    }
    @Post()
    registrar(@Body('user') usuario: Usuario) {
        return this.regis_S.register(usuario)
    }
    @Post("restablecer")
    restablecer(@Body() usuario: Usuario) {
        return this.regis_S.restablecer(usuario)
    }
}
