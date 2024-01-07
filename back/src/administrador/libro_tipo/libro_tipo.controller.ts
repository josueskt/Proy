import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { LibroTipoService } from './libro_tipo.service';

@Controller('libro-tipo')
export class LibroTipoController {
    constructor(private Libro :LibroTipoService){}
    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR'])
    trae() {
        return this.Libro.trae()
    };
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR'])
    crear(@Body() bod:{"datos":string}) {
        
       return this.Libro.crear(bod.datos)
    };
    @Delete(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR'])
    eliminar(@Param("id") id: number) {
        return this.Libro.eliminar(id)
    };
}
