import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { identity } from 'rxjs';
import { materia } from './materia.interface';

@Controller('materia')
export class MateriaController {
    constructor(public materia: MateriaService) { }
    @Get()
    trae() {
        return this.materia.trae()
    };
    @Get(':id')
    by_id(@Param("id") id: Number) {
        return this.materia.by_id(id)
    }
    @Post()
    crear(@Body() bod: materia) {
       return this.materia.crear(bod)
    };
    @Put(":id")
    editar(@Param("id") id: Number, @Body() bod: materia) {
        return this.materia.editar(id, bod)
    };
    @Delete(":id")
    eliminar(@Param("id") id: Number) {
        return this.materia.eliminar(id)
    };
}

