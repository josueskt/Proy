import { Controller, Get, Query } from '@nestjs/common';
import { InventarioService } from './inventario.service';

@Controller('inventario')
export class InventarioController {
    constructor(private inventario_s: InventarioService) { }
    @Get()
    traer_fisicos(@Query('buscar') codigo: string, @Query('pagina') pagina: number) {

        return this.inventario_s.traer_fisicos(codigo, pagina)
    }

}
