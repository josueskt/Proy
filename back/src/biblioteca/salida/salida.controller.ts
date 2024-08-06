import { Controller, Get, Param, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { SalidaService } from './salida.service';
import { RolesGuard } from 'src/roles/roles.guard';
@UseGuards(RolesGuard)
@SetMetadata('roles', ['BIBLIOTECA'])
@Controller('salida')
export class SalidaController {
    constructor(private salida_S: SalidaService) { }
    @Get()
    por_salir() {
        return this.salida_S.por_salir()
    }
    @Post('/:id')
    registrar_salida(@Param('id') id: string) {
        return this.salida_S.registar_salida(id)
    }

    @Get('/historial')
    historia_salida() {
        return this.salida_S.historial()
     }
}
