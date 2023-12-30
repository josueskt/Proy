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
exports.NacionalidadController = void 0;
const common_1 = require("@nestjs/common");
const nacionalidad_service_1 = require("./nacionalidad.service");
const roles_guard_1 = require("../../roles/roles.guard");
let NacionalidadController = class NacionalidadController {
    constructor(Nacionalidad) {
        this.Nacionalidad = Nacionalidad;
    }
    get_nacionalidad() {
        return this.Nacionalidad.traer_naciolanlidad();
    }
    eliminar(id) {
        console.log("asdad");
        return this.Nacionalidad.eliminar(id);
    }
    crear_nacionalidad(datos) {
        this.Nacionalidad.crear_autor(datos.nombre);
    }
};
exports.NacionalidadController = NacionalidadController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR', 'PROFESOR']),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NacionalidadController.prototype, "get_nacionalidad", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NacionalidadController.prototype, "eliminar", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NacionalidadController.prototype, "crear_nacionalidad", null);
exports.NacionalidadController = NacionalidadController = __decorate([
    (0, common_1.Controller)('nacionalidad'),
    __metadata("design:paramtypes", [nacionalidad_service_1.NacionalidadService])
], NacionalidadController);
//# sourceMappingURL=nacionalidad.controller.js.map