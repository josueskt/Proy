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
exports.CargaLLoteController = void 0;
const common_1 = require("@nestjs/common");
const carga_l_lote_service_1 = require("./carga_l_lote.service");
let CargaLLoteController = class CargaLLoteController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async carga_por_lote(body) {
        const datos = body.datos;
        const id = body.id_user.id_user;
        for (let dato of datos) {
            if (dato.titulo) {
                this.fileService.libros_bloque(dato, id);
            }
        }
    }
};
exports.CargaLLoteController = CargaLLoteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CargaLLoteController.prototype, "carga_por_lote", null);
exports.CargaLLoteController = CargaLLoteController = __decorate([
    (0, common_1.Controller)('carga-l-lote'),
    __metadata("design:paramtypes", [carga_l_lote_service_1.CargaLLoteService])
], CargaLLoteController);
//# sourceMappingURL=carga_l_lote.controller.js.map