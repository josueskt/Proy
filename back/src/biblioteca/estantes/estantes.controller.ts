import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('estantes')
export class EstantesController {
    @Get()
    traer_estantes(){

    }
    @Post()
    crear_estante(){

    }
    @Put()
    editar_estante(@Body()estante){

    }
    @Delete()
    eliminar(){

    }
    
}
