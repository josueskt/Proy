"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const sql_service_1 = require("./sql/sql.service");
const test_controller_1 = require("./test/test.controller");
const carrera_controller_1 = require("./administrador/carrera/carrera.controller");
const materia_controller_1 = require("./administrador/materia/materia.controller");
const usuarios_controller_1 = require("./administrador/usuarios/usuarios.controller");
const estadisticas_controller_1 = require("./administrador/estadisticas/estadisticas.controller");
const libro_controller_1 = require("./profesor/libro/libro.controller");
const login_controller_1 = require("./login/login.controller");
const buscador_controller_1 = require("./usuarios/buscador/buscador.controller");
const carrera_service_1 = require("./administrador/carrera/carrera.service");
const estadisticas_service_1 = require("./administrador/estadisticas/estadisticas.service");
const materia_service_1 = require("./administrador/materia/materia.service");
const libro_service_1 = require("./profesor/libro/libro.service");
const login_service_1 = require("./login/login.service");
const usuarios_service_1 = require("./administrador/usuarios/usuarios.service");
const core_1 = require("@nestjs/core");
const buscador_service_1 = require("./usuarios/buscador/buscador.service");
const descarga_controller_1 = require("./usuarios/descarga/descarga.controller");
const get_libro_controller_1 = require("./usuarios/get_libro/get_libro.controller");
const get_libro_service_1 = require("./usuarios/get_libro/get_libro.service");
const autor_controller_1 = require("./profesor/autor/autor.controller");
const autor_service_1 = require("./profesor/autor/autor.service");
const nacionalidad_controller_1 = require("./administrador/nacionalidad/nacionalidad.controller");
const nacionalidad_service_1 = require("./administrador/nacionalidad/nacionalidad.service");
const cambio_contra_controller_1 = require("./usuarios/cambio_contra/cambio_contra.controller");
const cambio_contra_service_1 = require("./usuarios/cambio_contra/cambio_contra.service");
const milibro_controller_1 = require("./profesor/libro/milibro/milibro.controller");
const descarga_service_1 = require("./usuarios/descarga/descarga.service");
const carga_l_lote_controller_1 = require("./administrador/carga_l_lote/carga_l_lote.controller");
const carga_l_lote_service_1 = require("./administrador/carga_l_lote/carga_l_lote.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, test_controller_1.TestController, carrera_controller_1.CarreraController, materia_controller_1.MateriaController, usuarios_controller_1.UsuariosController, estadisticas_controller_1.EstadisticasController, libro_controller_1.LibroController, login_controller_1.LoginController, buscador_controller_1.BuscadorController, descarga_controller_1.DescargaController, get_libro_controller_1.GetLibroController, autor_controller_1.AutorController, nacionalidad_controller_1.NacionalidadController, cambio_contra_controller_1.CambioContraController, milibro_controller_1.MilibroController, carga_l_lote_controller_1.CargaLLoteController],
        providers: [app_service_1.AppService, sql_service_1.SqlService, carrera_service_1.CarreraService, estadisticas_service_1.EstadisticasService, materia_service_1.MateriaService, libro_service_1.LibroService, login_service_1.LoginService, usuarios_service_1.UsuariosService, {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            }, buscador_service_1.BuscadorService, get_libro_service_1.GetLibroService, autor_service_1.AutorService, nacionalidad_service_1.NacionalidadService, cambio_contra_service_1.CambioContraService, descarga_service_1.DescargaService, carga_l_lote_service_1.CargaLLoteService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map