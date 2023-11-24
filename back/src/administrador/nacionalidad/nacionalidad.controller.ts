import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';

import { NacionalidadService } from './nacionalidad.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('nacionalidad')
export class NacionalidadController {
    constructor(private Nacionalidad:NacionalidadService){}

    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    @Get()
    get_nacionalidad(){
        this.Nacionalidad.traer_naciolanlidad()


    }
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    @Post()
    crear_nacionalidad(@Body('nombre') usuarios :any){
this.Nacionalidad.crear_autor(usuarios)


    }
}
