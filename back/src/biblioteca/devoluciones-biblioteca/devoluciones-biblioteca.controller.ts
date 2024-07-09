import { Controller, Post } from '@nestjs/common';
import { DevolucionesBibliotecaService } from './devoluciones-biblioteca.service';

@Controller('devoluciones-biblioteca')
export class DevolucionesBibliotecaController {

    constructor(private devolicion_S:DevolucionesBibliotecaService){}
    @Post()
    devolucion(datos:{observacion:string,fk_user:string}){
        

    }
}
