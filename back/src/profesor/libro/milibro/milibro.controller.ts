import { Body, Controller, Get, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { LibroService } from '../libro.service';

@Controller('milibro')
export class MilibroController {

    constructor(private libro:LibroService){}
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
    Traer_todos(@Body('nombre') datos ,@Query('page') pagina: number) { 

        return this.libro.traer(datos,pagina)
    }

    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
paginacion(@Query('nombre') datos ){
    return this.libro.pagination(datos)

}
}
