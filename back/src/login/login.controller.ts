import { Body, Controller, Post } from '@nestjs/common';
import { login } from './login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private Login: LoginService) {}

  @Post()
  login(@Body() datos: login) {
    return this.Login.Login(datos);
  }
}
