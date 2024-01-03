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
exports.MateriaService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
let MateriaService = class MateriaService {
    constructor(sql) {
        this.sql = sql;
    }
    async trae() {
        try {
            return await this.sql.query('select * from  libros.materia');
        }
        catch (error) {
            return error;
        }
    }
    ;
    async by_id(id) {
        try {
            return await this.sql.query('select * from  libros.materia where id_materia = $1', [id]);
        }
        catch (error) {
            return error;
        }
    }
    ;
    async crear(bod) {
        try {
            await this.sql.query('insert into libros.materia(nombre , fk_carrera) values ($1 , $2)', [bod.nombre, bod.fk_carrera]);
            return "carrera creada exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
    ;
    async editar(id, bod) {
        const n = bod.nombre;
        const fk = bod.fk_carrera;
        try {
            await this.sql.query('Update libros.materia set nombre = ($1) , fk_carrera =($2)  where id_materia = ($3)', [n, fk, id]);
            return "carrera creada exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
    ;
    async eliminar(id) {
        try {
            await this.sql.query('delete from libros.materia where id_materia = ($1)', [id]);
            return "carrera eliminada exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
    ;
};
exports.MateriaService = MateriaService;
exports.MateriaService = MateriaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], MateriaService);
//# sourceMappingURL=materia.service.js.map