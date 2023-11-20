import { Controller } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {
    constructor(public estadostica :EstadisticasService){}

registro_iniciado(){
    
this.estadostica.historial_iniciados()

}

}
