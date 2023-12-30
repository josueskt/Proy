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
exports.AutorController = void 0;
const common_1 = require("@nestjs/common");
const autor_service_1 = require("./autor.service");
const roles_guard_1 = require("../../roles/roles.guard");
let AutorController = class AutorController {
    constructor(Autro) {
        this.Autro = Autro;
    }
    traer() {
        return this.Autro.traer();
    }
    crear(nombre, nacionalidad) {
        this.Autro.crear_autor(nombre, nacionalidad);
    }
    eliminar(id) {
        this.Autro.eliminar(id);
    }
};
exports.AutorController = AutorController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AutorController.prototype, "traer", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR']),
    __param(0, (0, common_1.Body)('nombre')),
    __param(1, (0, common_1.Body)('nacionalidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], AutorController.prototype, "crear", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AutorController.prototype, "eliminar", null);
exports.AutorController = AutorController = __decorate([
    (0, common_1.Controller)('autor'),
    __metadata("design:paramtypes", [autor_service_1.AutorService])
], AutorController);
//# sourceMappingURL=autor.controller.js.map