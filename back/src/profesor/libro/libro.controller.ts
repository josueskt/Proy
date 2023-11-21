import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { LibroService } from './libro.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('libro')
export class LibroController {

    constructor(public carrera:LibroService){

    }

    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR'])
    Traer_todos() {

        return this.carrera.traer()

    }
    @Get(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR'])
    by_id(@Param("id") id: Number) {
        return this.carrera.by_id(id)
    }
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR'])
    crear(@Body() bod: any) {
        const ap = bod.nombre

      return   this.carrera.crear(ap)


    }
    @Delete(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR'])
    eliminar(@Param("id") id :Number ) {
     return this.carrera.eliminar(id)


    }
    @Put(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR'])
    editar(@Param("id") id :Number , @Body( ) datos:any) {
        const ap = datos.nombre
        return this.carrera.editar(id , ap)

    }


}
