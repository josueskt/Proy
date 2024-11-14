import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { Seccion } from './seccion.interface';
import { RolesGuard } from 'src/roles/roles.guard';
import { SecionesService } from './seciones.service';

@Controller('seciones')
export class SecionesController {

    constructor(private seccionS: SecionesService) { }
    @Get('/libros')
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    traer_libros_sin_usar(@Query('buscar')buscar:string) {
        return this.seccionS.l_s_u(buscar)

    }
    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    todas_seciones_estante(@Query('estante') id: string) {
        return this.seccionS.t_c_e(id)

    }
    @Get(':id')
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    traer_secion_y_libros(@Param('id') id: string) {
        return this.seccionS.l_s_l(id)
    }
    @Put()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    editar_seccion(@Body('seccion') seccion:{}) {


        return this.seccionS.editar(seccion)

        //editar lleva en el front  recive un array de libros a la seccion  y tambien recive un array de los libros eliminados de esa secion 
        //agregar aqui mismo uno para traer todos los libros q no estan  añadidos a una secion 
        // los libros eliminados tienes que volver a ser null en su kf_seccion 
    }
    @Delete(':id')
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    eliminar_secion(@Param('id')id:string) {

return this.seccionS.eliminar(id)        //toca ahcer un uodate a todos los libros y luego eliminarlo :3 

    }
    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['BIBLIOTECA', 'ADMINISTRADOR'])
    crear_secion(@Body('seccion') seccion: Seccion) {
    
        return this.seccionS.crear_seccion(seccion)
    }


}
