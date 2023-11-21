import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SqlService } from './sql/sql.service';
import { TestController } from './test/test.controller';
import { CarreraController } from './administrador/carrera/carrera.controller';
import { MateriaController } from './administrador/materia/materia.controller';
import { UsuariosController } from './administrador/usuarios/usuarios.controller';
import { EstadisticasController } from './administrador/estadisticas/estadisticas.controller';
import { LibroController } from './profesor/libro/libro.controller';
import { LoginController } from './login/login.controller';
import { RegistrarArcController } from './administrador/registrar_arc/registrar_arc.controller';
import { BuscadorController } from './usuarios/buscador/buscador.controller';

import { LibController } from './usuarios/lib/lib.controller';
import { CarreraService } from './administrador/carrera/carrera.service';
import { EstadisticasService } from './administrador/estadisticas/estadisticas.service';
import { MateriaService } from './administrador/materia/materia.service';
import { RegistrarArcService } from './administrador/registrar_arc/registrar_arc.service';
import { LibroService } from './profesor/libro/libro.service';
import { LoginService } from './login/login.service';
import { UsuariosService } from './administrador/usuarios/usuarios.service';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [],
  controllers: [AppController, TestController, CarreraController, MateriaController, UsuariosController, EstadisticasController, LibroController, LoginController, RegistrarArcController, BuscadorController, LibController ],
  providers: [AppService, SqlService, CarreraService, EstadisticasService, MateriaService, RegistrarArcService, LibroService, LoginService, UsuariosService,  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule {
 
  
  
}
