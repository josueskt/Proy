import { Controller, Get, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('inventario')
export class InventarioController {
    constructor(private inventario_s: InventarioService) { }
    @UseGuards(RolesGuard)
  @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    @Get()
    traer_fisicos(@Query('buscar') codigo: string, @Query('pagina') pagina: number) {

        return this.inventario_s.traer_fisicos(codigo, pagina)
    }

}
