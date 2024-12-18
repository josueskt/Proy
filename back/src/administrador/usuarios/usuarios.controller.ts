import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Usuario } from './usuario.interface';

@Controller('usuarios_regis')
export class UsuariosController {
    constructor(private user: UsuariosService) { }


    @Post()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    @UsePipes(ValidationPipe)
    register(@Body("users") usuarios) {

      return this.user.register(usuarios)

    }
    


    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    Get_rol() {
        return this.user.get_rol()
    }

   
    @Delete(':id')
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['ADMINISTRADOR'])
    eliminar(@Param("id") id: number) {
        return this.user.delete_user(id)
    }
    @Get(':id')
    byid(@Param('id') id:string){
        return this.user.get_users_id(id)

    }

    @Put(':id')
    actualisar( @Param('id') id: number,@Body() datos:Usuario){
       
        
        return this.user.editar_usuario(id,datos)
        
    }

}
