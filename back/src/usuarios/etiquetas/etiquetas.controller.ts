import { Controller, Get, Param } from '@nestjs/common';
import { EtiquetasService } from './etiquetas.service';

@Controller('etiquetas')
export class EtiquetasController {
    constructor(private etiqueta: EtiquetasService){

    }

@Get(':id')
traer(@Param('id') id:number){
    
    return this.etiqueta.traer(id)
}

}
