import { Body, Controller, Get, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { CambioContraService } from './cambio_contra.service';

@Controller('cambio-contra')
export class CambioContraController {
    constructor(private cambio:CambioContraService){}
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE'])
    buscador_libro(@Body()datos :any){
 return this.cambio.Contra(datos.id,datos.contra)
        


    }


}
