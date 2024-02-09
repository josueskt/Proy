import { Body, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { LibroService } from '../libro.service';

@Controller('milibro')
export class MilibroController {

    constructor(private libro:LibroService){}
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR','ADMINISTRADOR'])
    Traer_todos(@Body('nombre') datos) { 

        return this.libro.traer(datos)
    }
}
