import { Body, Controller, Post, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegisterUser } from 'src/dto/user.dto';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('usuarios_regis')
export class UsuariosController {
    constructor(private user:UsuariosService){}


    @Post()
   // @UseGuards(RolesGuard)
   // @SetMetadata('roles', ['ADMINISTRADOR'])
    @UsePipes(ValidationPipe)
    register( @Body() usuarios :RegisterUser[]){
  
   return this.user.register(usuarios)
   
    }




}
