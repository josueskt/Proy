import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { Ingreso } from './ingreso.interface';
import { IngresoService } from './ingreso.service';
import { RolesGuard } from 'src/roles/roles.guard';
@UseGuards(RolesGuard)
@SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
@Controller('ingreso')
export class IngresoController {

    constructor(private ingreso_S: IngresoService) { }

    @Post()
    registrar_ingreso(@Body() ingreso: Ingreso) {
       return this.ingreso_S.registro(ingreso)

    }

    

    @Get('/paralelo')
    traer_paralelo() {
        return this.ingreso_S.traer_paralelo()
    }

    @Get('/jornada')
    traer_jornada() {
        return this.ingreso_S.traer_jornada()

    }

    @Get('/nivel')
    traer_nivel() {
        return this.ingreso_S.traer_nivel()

    }

    @Get('/actividad')
    traer_actividad() {
        return this.ingreso_S.traer_actividad()

    }
}
