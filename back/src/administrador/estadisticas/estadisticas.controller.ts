import { Controller, Get, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('estadisticas')
export class EstadisticasController {
    constructor(public estadostica: EstadisticasService) { }

    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    registro_iniciado() {

        return this.estadostica.historial_iniciados()

    }
    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('prestamos', ['ADMINISTRADOR'])
    registro_prestamos() {

        return this.estadostica.historial_prestamos()

    }

    @Get("reporte")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    informe_inicio(@Query("id") fecha) {
        return this.estadostica.informe(fecha)

    }

}
