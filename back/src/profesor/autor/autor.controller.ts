import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AutorService } from './autor.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('autor')
export class AutorController {

constructor(private Autro:AutorService){}


@Get()
@UseGuards(RolesGuard)
@SetMetadata('roles', ['PROFESOR', 'ADMINISTRADOR','BIBLIOTECA'])
traer(){
  return   this.Autro.traer()
}

@Post()
@UseGuards(RolesGuard)
@SetMetadata('roles', ['PROFESOR', 'ADMINISTRADOR','BIBLIOTECA'])
crear(@Body('nombre') nombre:string){
    this.Autro.crear_autor(nombre)
}


@Delete(':id')
eliminar(@Param('id') id:number){
this.Autro.eliminar(id)


}




}
