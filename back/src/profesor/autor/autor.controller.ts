import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AutorService } from './autor.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('autor')
export class AutorController {

constructor(private Autro:AutorService){}


@Get()
@UseGuards(RolesGuard)
@SetMetadata('roles', ['PROFESOR'])
traer(){
    this.Autro.traer()
}

@Post()
@UseGuards(RolesGuard)
@SetMetadata('roles', ['PROFESOR'])
crear(@Body() nombre:String, @Body() nacionalidad:Number){
    this.Autro.crear_autor(nombre,nacionalidad)
}




}
