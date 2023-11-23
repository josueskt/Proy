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
import { BuscadorService } from './usuarios/buscador/buscador.service';
import { DescargaController } from './usuarios/descarga/descarga.controller';
import { GetLibroController } from './usuarios/get_libro/get_libro.controller';
import { GetLibroService } from './usuarios/get_libro/get_libro.service';
import { AutorController } from './profesor/autor/autor.controller';
import { AutorService } from './profesor/autor/autor.service';
import { NacionalidadController } from './administrador/nacionalidad/nacionalidad.controller';
import { NacionalidadService } from './administrador/nacionalidad/nacionalidad.service';



@Module({
  imports: [],
  controllers: [AppController, TestController, CarreraController, MateriaController, UsuariosController, EstadisticasController, LibroController, LoginController, RegistrarArcController, BuscadorController, LibController, DescargaController, GetLibroController, AutorController, NacionalidadController ],
  providers: [AppService, SqlService, CarreraService, EstadisticasService, MateriaService, RegistrarArcService, LibroService, LoginService, UsuariosService,  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }, BuscadorService, GetLibroService, AutorService, NacionalidadService],
})
export class AppModule {
 
  
  
}
