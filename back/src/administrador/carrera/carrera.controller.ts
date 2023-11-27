import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('carrera')
export class CarreraController {

    constructor(public carrera: CarreraService) { }

    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
    Traer_todos() {


        return this.carrera.traer()

    }
  
    @Get(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    by_id(@Param("id") id: Number) {
        return this.carrera.by_id(id)
    }
    
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    crear(@Body() bod: any) {
        const ap = bod.nombre

      return   this.carrera.crear(ap)


    }
    @Delete(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    eliminar(@Param("id") id :Number ) {
     return this.carrera.eliminar(id)


    }
    @Put(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    editar(@Param("id") id :Number , @Body( ) datos:any) {
       
        return this.carrera.editar(id , datos)

    }


}
