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
exports.MateriaController = void 0;
const common_1 = require("@nestjs/common");
const materia_service_1 = require("./materia.service");
const roles_guard_1 = require("../../roles/roles.guard");
let MateriaController = class MateriaController {
    constructor(materia) {
        this.materia = materia;
    }
    trae() {
        return this.materia.trae();
    }
    ;
    by_id(id) {
        return this.materia.by_id(id);
    }
    crear(bod) {
        return this.materia.crear(bod);
    }
    ;
    editar(id, bod) {
        return this.materia.editar(id, bod);
    }
    ;
    eliminar(id) {
        return this.materia.eliminar(id);
    }
    ;
};
exports.MateriaController = MateriaController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MateriaController.prototype, "trae", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MateriaController.prototype, "by_id", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MateriaController.prototype, "crear", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MateriaController.prototype, "editar", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRADOR']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MateriaController.prototype, "eliminar", null);
exports.MateriaController = MateriaController = __decorate([
    (0, common_1.Controller)('materia'),
    __metadata("design:paramtypes", [materia_service_1.MateriaService])
], MateriaController);
//# sourceMappingURL=materia.controller.js.map