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
exports.BuscadorService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
let BuscadorService = class BuscadorService {
    constructor(sql) {
        this.sql = sql;
    }
    async buscar_libros(cadena, carrera) {
        const params = [`%${cadena}%`];
        let restul;
        let query;
        try {
            query = `
        SELECT l.id_libro, l.titulo ,l.nombre_archivo , l.fecha_publ , l.descripcion , l.imagen , l.num_paginas , c.nombre as nombre_carrera , a.nombre as autor_nombre
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        WHERE l.titulo LIKE $1
      `;
            restul = await this.sql.query(query, params);
            if (!restul.length) {
                query = `
        SELECT l.id_libro, l.titulo ,l.nombre_archivo , l.fecha_publ , l.descripcion , l.imagen , l.num_paginas , c.nombre as nombre_carrera , a.nombre as autor_nombre
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        WHERE a.nombre LIKE $1
      `;
                restul = await this.sql.query(query, params);
            }
            if (!restul.length) {
                query = `
        SELECT l.id_libro, l.titulo ,l.nombre_archivo , l.fecha_publ , l.descripcion , l.imagen , l.num_paginas , c.nombre as nombre_carrera , a.nombre as autor_nombre
        FROM libros.libro as l
        LEFT JOIN libros.carrera as c ON l.fk_carrera = c.id_carrera
        LEFT JOIN libros.autor as a ON l.fk_autor = a.id_autor
        WHERE l.nombre_archivo LIKE $1
      `;
                restul = await this.sql.query(query, params);
            }
            if (carrera) {
                query += ' AND c.id_carrera = $2';
                params.push(carrera);
                restul = await this.sql.query(query, params);
            }
            return restul;
        }
        catch (error) {
            return error;
        }
    }
};
exports.BuscadorService = BuscadorService;
exports.BuscadorService = BuscadorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], BuscadorService);
//# sourceMappingURL=buscador.service.js.map