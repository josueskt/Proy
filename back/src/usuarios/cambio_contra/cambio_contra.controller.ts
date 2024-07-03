import { Body, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { CambioContraService } from './cambio_contra.service';
import { cambio_contra } from './cambiocontra';

@Controller('cambio-contra')
export class CambioContraController {
    constructor(private cambio:CambioContraService){}
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE','BIBLIOTECA'])
    cambio_contra(@Body()datos :cambio_contra){
        
   return this.cambio.Contra(datos.id,datos.contra)  
    }
}
