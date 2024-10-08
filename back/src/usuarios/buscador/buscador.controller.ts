import { Controller, Get, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('buscador')
export class BuscadorController {
constructor(private buscar:BuscadorService){}
    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE','BIBLIOTECA'])
    buscador_libro(@Query('cadena') cadena:string,@Query('carrera') carrera:string,@Query('page') page:number){
        return this.buscar.buscar_libros(cadena,carrera,page)
    }

    @Get('index')
    index_resultado(@Query('cadena') cadena:string,@Query('carrera') carrera:string){
 return this.buscar.index(cadena,carrera)
    }
}
