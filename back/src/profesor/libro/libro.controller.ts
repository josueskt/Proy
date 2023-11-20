import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibroService } from './libro.service';

@Controller('libro')
export class LibroController {

    constructor(public carrera:LibroService){

    }

    @Get()
    Traer_todos() {

        return this.carrera.traer()

    }
    @Get(":id")
    by_id(@Param("id") id: Number) {
        return this.carrera.by_id(id)
    }
    @Post()
    crear(@Body() bod: any) {
        const ap = bod.nombre

      return   this.carrera.crear(ap)


    }
    @Delete(":id")
    eliminar(@Param("id") id :Number ) {
     return this.carrera.eliminar(id)


    }
    @Put(":id")
    editar(@Param("id") id :Number , @Body( ) datos:any) {
        const ap = datos.nombre
        return this.carrera.editar(id , ap)

    }


}
