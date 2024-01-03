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
exports.CarreraService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
let CarreraService = class CarreraService {
    constructor(sql) {
        this.sql = sql;
    }
    async traer() {
        const reslut = await this.sql.query('select * from Libros.carrera');
        return reslut;
    }
    async by_id(id) {
        try {
            const reslut = await this.sql.query('select * from Libros.carrera where id_carrera = ($1)', [id]);
            if (reslut.length === 0) {
                return { message: "no encontrado" };
            }
            else {
                return reslut;
            }
        }
        catch (error) {
            return error;
        }
    }
    async crear(mod) {
        try {
            await this.sql.query('INSERT INTO libros.carrera (nombre) values ($1)', [mod.nombre]);
        }
        catch (error) {
            return error;
        }
    }
    async eliminar(id) {
        try {
            await this.sql.query('delete from  libros.carrera where  id_carrera = $1', [id]);
            return { message: "Carrera eliminada exitosamente" };
        }
        catch (error) {
            return error;
        }
    }
    async editar(id, bod) {
        const ap = bod.nombre;
        try {
            await this.sql.query('update libros.carrera set nombre = $2 where  id_carrera = ($1)', [id, ap]);
            return { message: "Carrera actualizada exitosamente" };
        }
        catch (error) {
            return error;
        }
    }
};
exports.CarreraService = CarreraService;
exports.CarreraService = CarreraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], CarreraService);
//# sourceMappingURL=carrera.service.js.map