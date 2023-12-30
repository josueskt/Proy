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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NacionalidadService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
let NacionalidadService = class NacionalidadService {
    constructor(sql) {
        this.sql = sql;
    }
    async traer_naciolanlidad() {
        const reslut = await this.sql.query('select * from Libros.nacionalida');
        return reslut;
    }
    async crear_autor(nombre) {
        try {
            await this.sql.query('INSERT INTO libros.nacionalida (nombre) values ($1)', [nombre]);
            return "carrera creada exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
    async eliminar(id) {
        console.log("entrop");
        try {
            await this.sql.query('delete from  libros.nacionalida where  id_nacionalidad = $1', [id]);
            return { message: "Carrera eliminada exitosamente" };
        }
        catch (error) {
            return error;
        }
    }
};
exports.NacionalidadService = NacionalidadService;
exports.NacionalidadService = NacionalidadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], NacionalidadService);
//# sourceMappingURL=nacionalidad.service.js.map