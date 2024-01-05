import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('estadisticas')
export class EstadisticasController {
    constructor(public estadostica :EstadisticasService){}

@Get()
@UseGuards(RolesGuard)
@SetMetadata('roles', ['ADMINISTRADOR'])
registro_iniciado(){
    
return this.estadostica.historial_iniciados()

}

}
