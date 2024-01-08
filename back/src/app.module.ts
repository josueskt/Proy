import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SqlService } from './sql/sql.service';
import { CarreraController } from './administrador/carrera/carrera.controller';
import { MateriaController } from './administrador/materia/materia.controller';
import { UsuariosController } from './administrador/usuarios/usuarios.controller';
import { EstadisticasController } from './administrador/estadisticas/estadisticas.controller';
import { LibroController } from './profesor/libro/libro.controller';
import { LoginController } from './login/login.controller';
//import { RegistrarArcController } from './administrador/registrar_arc/registrar_arc.controller';
import { BuscadorController } from './usuarios/buscador/buscador.controller';


import { CarreraService } from './administrador/carrera/carrera.service';
import { EstadisticasService } from './administrador/estadisticas/estadisticas.service';
import { MateriaService } from './administrador/materia/materia.service';
//import { RegistrarArcService } from './administrador/registrar_arc/registrar_arc.service';
import { LibroService } from './profesor/libro/libro.service';
import { LoginService } from './login/login.service';
import { UsuariosService } from './administrador/usuarios/usuarios.service';
import { APP_PIPE } from '@nestjs/core';
import { BuscadorService } from './usuarios/buscador/buscador.service';
import { DescargaController } from './usuarios/descarga/descarga.controller';

import { AutorController } from './profesor/autor/autor.controller';
import { AutorService } from './profesor/autor/autor.service';

import { CambioContraController } from './usuarios/cambio_contra/cambio_contra.controller';
import { CambioContraService } from './usuarios/cambio_contra/cambio_contra.service';
import { MilibroController } from './profesor/libro/milibro/milibro.controller';
import { DescargaService } from './usuarios/descarga/descarga.service';
import { CargaLLoteController } from './administrador/carga_l_lote/carga_l_lote.controller';
import { CargaLLoteService } from './administrador/carga_l_lote/carga_l_lote.service';
import { LibroTipoController } from './administrador/libro_tipo/libro_tipo.controller';
import { LibroTipoService } from './administrador/libro_tipo/libro_tipo.service';

import { PalabrasClaveService } from './administrador/palabras-clave/palabras-clave.service';



@Module({
  imports: [],
  controllers: [AppController, CarreraController, MateriaController, UsuariosController, EstadisticasController, LibroController, LoginController,  BuscadorController, DescargaController, AutorController, CambioContraController, MilibroController, CargaLLoteController, LibroTipoController ],
  providers: [AppService, SqlService, CarreraService, EstadisticasService, MateriaService, LibroService, LoginService, UsuariosService,  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }, BuscadorService, AutorService, CambioContraService, DescargaService, CargaLLoteService, LibroTipoService,  PalabrasClaveService],
})
export class AppModule {
 
  
  
}
