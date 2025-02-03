import {Headers, Controller, Delete, Get, Param, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { LibroService } from '../libro.service';
import * as jwt from 'jsonwebtoken';
@Controller('milibro')
export class MilibroController {

    constructor(private libro: LibroService) { }
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR', 'ADMINISTRADOR','BIBLIOTECA'])
    Traer_todos(@Headers('authorization') authHeader: string, @Query('cadena') cadena: string, @Query('carrera') carrera: number, @Query('page') page: number, @Query("tipo") tipo: number, @Query("estante") estante, @Query("seccion") Seccion) {
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.Key_Key) as any; 
if(payload.nombre_rol  === 'ADMINISTRADOR'){
    return this.libro.traer(cadena, carrera, page, tipo, estante, Seccion)
}else{
    return this.libro.traerprofe(cadena, carrera, page, tipo, estante, Seccion,payload.id_user)
}
    }
    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['PROFESOR', 'ADMINISTRADOR','BIBLIOTECA'])
    paginacion(@Query('nombre') datos) {
        

        return this.libro.pagination(datos)

    }
    @Delete('palabra/:id')
    eliminar(@Param('id') id) {
        return this.libro.eliminarP(id)
    }

}

