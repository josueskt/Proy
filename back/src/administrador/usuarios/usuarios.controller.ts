import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegisterUser } from 'src/dto/user.dto';

@Controller('usuarios_regis')
export class UsuariosController {
    constructor(private user:UsuariosService){}


    @Post()
    @UsePipes(ValidationPipe)
    register( @Body() usuarios :RegisterUser[]){
  
   return this.user.register(usuarios)
   
    }




}
