import { Controller, Get, Query } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
//import { RolesGuard } from 'src/roles/roles.guard';

@Controller('buscador')
export class BuscadorController {
constructor(private buscar:BuscadorService){}


    @Get()
   // @UseGuards(RolesGuard)
    //@SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
    buscador_libro(@Query('cadena') cadena:string,@Query('carrera') carrera:string){
       
        return this.buscar.buscar_libros(cadena,carrera)

    }
}
