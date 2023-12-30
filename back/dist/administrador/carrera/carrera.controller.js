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
exports.CarreraController = void 0;
const common_1 = require("@nestjs/common");
const carrera_service_1 = require("./carrera.service");
const roles_guard_1 = require("../../roles/roles.guard");
let CarreraController = class CarreraController {
    constructor(carrera) {
        this.carrera = carrera;
    }
    Traer_todos() {
        return this.carrera.traer();
    }
    by_id(id) {
        return this.carrera.by_id(id);
    }
    crear(bod) {
        return this.carrera.crear(bod);
    }
    eliminar(id) {
        return this.carrera.eliminar(id);
    }
    editar(id, datos) {
        return this.carrera.editar(id, datos);
    }
};
exports.CarreraController = CarreraController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR', 'PROFESOR', 'ESTUDIANTE']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarreraController.prototype, "Traer_todos", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarreraController.prototype, "by_id", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarreraController.prototype, "crear", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarreraController.prototype, "eliminar", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CarreraController.prototype, "editar", null);
exports.CarreraController = CarreraController = __decorate([
    (0, common_1.Controller)('carrera'),
    __metadata("design:paramtypes", [carrera_service_1.CarreraService])
], CarreraController);
//# sourceMappingURL=carrera.controller.js.map