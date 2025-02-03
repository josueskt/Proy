import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { materia } from './materia.interface';
import { RolesGuard } from 'src/roles/roles.guard'; @Controller('materia')
export class MateriaController {
    constructor(public materia: MateriaService) { }     @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    trae() {
        return this.materia.trae()
    };
    @Get(':id')
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    by_id(@Param("id") id: number) {
        return this.materia.by_id(id)
    }
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    crear(@Body() bod: materia) {
       return this.materia.crear(bod)
    };
    @Put(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    editar(@Param("id") id: number, @Body() bod: materia) {
        return this.materia.editar(id, bod)
    };
    @Delete(":id")
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    eliminar(@Param("id") id: number) {
        return this.materia.eliminar(id)
    };
} 