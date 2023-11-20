import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarreraService } from './carrera.service';

@Controller('carrera')
export class CarreraController {

    constructor(public carrera: CarreraService) { }

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
       
        return this.carrera.editar(id , datos)

    }


}
