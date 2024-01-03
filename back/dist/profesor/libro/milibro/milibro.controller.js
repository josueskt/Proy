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
exports.MilibroController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../../roles/roles.guard");
const libro_service_1 = require("../libro.service");
let MilibroController = class MilibroController {
    constructor(carrera) {
        this.carrera = carrera;
    }
    Traer_todos(datos) {
        return this.carrera.traer(datos);
    }
};
exports.MilibroController = MilibroController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.SetMetadata)('roles', ['PROFESOR', 'ADMINISTRADOR']),
    __param(0, (0, common_1.Body)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MilibroController.prototype, "Traer_todos", null);
exports.MilibroController = MilibroController = __decorate([
    (0, common_1.Controller)('milibro'),
    __metadata("design:paramtypes", [libro_service_1.LibroService])
], MilibroController);
//# sourceMappingURL=milibro.controller.js.map