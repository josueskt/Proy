import { Controller, Get, Query } from '@nestjs/common';
import { ReporteLibroService } from './reporte_libro.service';

@Controller('reporte-libro')
export class ReporteLibroController {

    constructor(private reporte_S: ReporteLibroService) { }
    @Get()
    ob_reportes(@Query('carrera') carrera: number, @Query('tipo') tipo: number) {


        return this.reporte_S.reportes(carrera, tipo)
    }

}
