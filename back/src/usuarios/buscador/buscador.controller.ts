import { Controller, Get, Query } from '@nestjs/common';
import { BuscadorService } from './buscador.service';

@Controller('buscador')
export class BuscadorController {
constructor(private buscar:BuscadorService){}

    @Get()
    buscador_libro(@Query('cadena') cadena:string,@Query('carrera') carrera:string){
        console.log("aaa")
        return this.buscar.buscar_libros(cadena,carrera)

    }
}
