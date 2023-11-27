import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';

import { NacionalidadService } from './nacionalidad.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('nacionalidad')
export class NacionalidadController {
    constructor(private Nacionalidad:NacionalidadService){}

    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    @Get()
    get_nacionalidad(){
      return  this.Nacionalidad.traer_naciolanlidad()


    }
    @Delete(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    eliminar(@Param("id") id :Number ) {
        console.log("asdad")
     return this.Nacionalidad.eliminar(id)
    }
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    @Post()
    crear_nacionalidad(@Body() datos :any){
       
    this.Nacionalidad.crear_autor(datos.nombre)


    }
}
