"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscadorController = void 0;
const common_1 = require("@nestjs/common");
const buscador_service_1 = require("./buscador.service");
const roles_guard_1 = require("../../roles/roles.guard");
let BuscadorController = class BuscadorController {
    constructor(buscar) {
        this.buscar = buscar;
    }
    buscador_libro(cadena, carrera) {
        return this.buscar.buscar_libros(cadena, carrera);
    }
};
exports.BuscadorController = BuscadorController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR', 'PROFESOR', 'ESTUDIANTE']),
    __param(0, (0, common_1.Query)('cadena')),
    __param(1, (0, common_1.Query)('carrera')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BuscadorController.prototype, "buscador_libro", null);
exports.BuscadorController = BuscadorController = __decorate([
    (0, common_1.Controller)('buscador'),
    __metadata("design:paramtypes", [buscador_service_1.BuscadorService])
], BuscadorController);
//# sourceMappingURL=buscador.controller.js.map