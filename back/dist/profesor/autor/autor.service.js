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
exports.AutorService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
let AutorService = class AutorService {
    constructor(sql) {
        this.sql = sql;
    }
    async traer() {
        const reslut = await this.sql.query('select a.id_autor , a.nombre, n.nombre as nacionalidad from Libros.autor as a  inner join libros.nacionalida as n on  a.fk_nacionalidad = n.id_nacionalidad');
        return reslut;
    }
    async crear_autor(nombre, nacionalidad) {
        try {
            await this.sql.query('INSERT INTO libros.autor (nombre , fk_nacionalidad ) values ($1,$2)', [nombre, nacionalidad]);
            return "carrera creada exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
    async eliminar(id) {
        try {
            await this.sql.query('DELETE FROM libros.autor where id_autor = $1', [id]);
            return "carrera creada exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
};
exports.AutorService = AutorService;
exports.AutorService = AutorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], AutorService);
//# sourceMappingURL=autor.service.js.map