import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { login } from './login.dto';
import { LoginService } from './login.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('login')
export class LoginController {
  constructor(private Login: LoginService) {}

  @Post()
  login(@Body() datos: login) {
    return this.Login.Login(datos);
  }

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['ADMINISTRADOR','PROFESOR' , 'ESTUDIANTE','BIBLIOTECA'])
  token_valid(){
  }
}
