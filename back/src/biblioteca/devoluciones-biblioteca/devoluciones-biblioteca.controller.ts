import { Body, Controller, Get, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { DevolucionesBibliotecaService } from './devoluciones-biblioteca.service';
import { Prestamo } from '../prestamos/prestamo.interface';
import { RolesGuard } from 'src/roles/roles.guard';
@UseGuards(RolesGuard)
@SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
@Controller('devoluciones-biblioteca')
export class DevolucionesBibliotecaController {

    constructor(private devolicion_S:DevolucionesBibliotecaService){}


    @Get()
    traer_prestamo_realizados(@Query('codigo') codigo: string) {
      return this.devolicion_S.traer_devolucion_disponibles(codigo)
    }
    @Post()
    entrega_prestamo(@Body('prestamo') prestamo: Prestamo) {
        return this.devolicion_S.entrega(prestamo)
      }
}
