import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EstantesService } from './estantes.service';
import { estante } from './estante.interface';

@Controller('estantes')
export class EstantesController {
    constructor(private estante_S: EstantesService) { }
    @Get()
    traer_estantes() {
        return this.estante_S.traer()
    }
    @Post()
    crear_estante(@Body('estante') estante: estante) {
        return this.estante_S.crear(estante)
    }
    @Put()
    editar_estante(@Body() estante) {
        return this.estante_S.editar(estante)
    }
    @Delete(':id')
    eliminar(@Param('id') id: string) {
        return this.estante_S.eliminar(id)
    }

}
