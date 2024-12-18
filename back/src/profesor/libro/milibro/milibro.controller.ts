import { Body, Controller, Get, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { LibroService } from '../libro.service';

@Controller('milibro')
export class MilibroController {

    constructor(private libro:LibroService){}
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
    Traer_todos(@Query('cadena') cadena: string, @Query('carrera') carrera: number, @Query('page') page: number, @Query("tipo") tipo:number, @Query("estante") estante, @Query("seccion") Seccion) { 

        return this.libro.traer(cadena, carrera, page,tipo,estante,Seccion)
    }

    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
paginacion(@Query('nombre') datos ){
    return this.libro.pagination(datos)

}
}
