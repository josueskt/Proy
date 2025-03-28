import { Body, Controller, Get, Param, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { PrestamosService } from './prestamos.service';
import { Prestamo } from './prestamo.interface';

@Controller('prestamos')
export class PrestamosController {
constructor(private prestamoS:PrestamosService){}
    @Get('/libros')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
  libros_disponibles(@Query('libro') libro: string) {
    return this.prestamoS.libros_disponibles(libro)
  }
  @Get('/usuario/:id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
  usuarios(@Param('id') id:string) {
    return this.prestamoS.usuarios(id)
  }

  @Post()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
  crear_prestamo(@Body('prestamo') prestamo: Prestamo) {
    return this.prestamoS.prestamo(prestamo)


  }
  @Get(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
 
  traer_historial_prestamo(@Param('id') id: string) {

    return this.prestamoS.historial_prestamo(id)

  }
}
