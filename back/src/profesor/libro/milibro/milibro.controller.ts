import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { LibroService } from '../libro.service';

@Controller('milibro')
export class MilibroController {

    constructor(private carrera:LibroService){}
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
    Traer_todos(@Body('nombre') datos) {
       

        return this.carrera.traer(datos)

    }




}