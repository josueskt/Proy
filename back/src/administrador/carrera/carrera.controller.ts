import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { carrera } from './carrera.interface';

@Controller('carrera')
export class CarreraController {

    constructor(public carrera: CarreraService) { }
    @Get()
    // @UseGuards(RolesGuard)
    // @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE','BIBLIOTECA'])
    Traer_todos() {
        return this.carrera.traer()
    }
  
    @Get(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    by_id(@Param("id") id: number) {
        return this.carrera.by_id(id)
    }
    
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    crear(@Body() bod: carrera) {
        
      return this.carrera.crear(bod)
    }
    @Delete(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    eliminar(@Param("id") id :number ) {
        
     return this.carrera.eliminar(id)


    }
    @Put(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    editar(@Param("id") id :number , @Body( ) datos:any) {
       return this.carrera.editar(id , datos)

    }


}
