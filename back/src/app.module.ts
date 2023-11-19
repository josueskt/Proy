import { Module } from '@nestjs/common';
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


@Module({
  imports: [],
  controllers: [AppController, TestController, CarreraController, MateriaController, UsuariosController, EstadisticasController, LibroController, LoginController, RegistrarArcController, BuscadorController, LibController ],
  providers: [AppService, SqlService],
})
export class AppModule {}
