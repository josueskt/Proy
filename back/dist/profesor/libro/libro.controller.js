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
exports.LibroController = void 0;
const common_1 = require("@nestjs/common");
const libro_service_1 = require("./libro.service");
const roles_guard_1 = require("../../roles/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
let LibroController = class LibroController {
    constructor(carrera) {
        this.carrera = carrera;
    }
    Traer_todos(datos) {
        return this.carrera.traer(datos);
    }
    by_id(id) {
        return this.carrera.by_id(id);
    }
    async crear(file, libro) {
        try {
            const message = await this.carrera.crear(libro, file);
            return { message, newFileName: 'gg' };
        }
        catch (error) {
            return { message: 'Error al procesar la solicitud', newFileName: '' };
        }
    }
    eliminar(id) {
        return this.carrera.eliminar(id);
    }
    editar(id, datos) {
        const ap = datos.nombre;
        return this.carrera.editar(id, ap);
    }
};
exports.LibroController = LibroController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR']),
    __param(0, (0, common_1.Body)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibroController.prototype, "Traer_todos", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR', 'ADMINISTRADOR', 'ESTUDIANTE']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LibroController.prototype, "by_id", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('libro')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibroController.prototype, "crear", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR']),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LibroController.prototype, "eliminar", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR']),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LibroController.prototype, "editar", null);
exports.LibroController = LibroController = __decorate([
    (0, common_1.Controller)('libro'),
    __metadata("design:paramtypes", [libro_service_1.LibroService])
], LibroController);
//# sourceMappingURL=libro.controller.js.map