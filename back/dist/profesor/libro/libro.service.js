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
exports.LibroService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
let LibroService = class LibroService {
    constructor(sql) {
        this.sql = sql;
    }
    async traer(nombre) {
        const reslut = await this.sql.query(`SELECT
            l.id_libro,
            l.titulo,
            l.fecha_publ,
            l.descripcion,
            l.imagen,
            a.nombre as autor,
            c.nombre as carrera,
            l.nombre_archivo,
            COALESCE(COUNT(p.*), 0) as total_descargas
        FROM
            libros.libro as l
            INNER JOIN libros.carrera as c ON c.id_carrera = l.fk_carrera
            INNER JOIN libros.autor as a ON a.id_autor = l.fk_autor
            LEFT JOIN tramites.prestamo as p ON p.fk_libro = l.id_libro
        WHERE
            l.fk_creador = $1
        GROUP BY
            l.id_libro, l.titulo, l.fecha_publ, l.descripcion, l.imagen, a.nombre, c.nombre, l.nombre_archivo;
        `, [nombre]);
        return reslut;
    }
    async by_id(id) {
        try {
            const reslut = await this.sql.query(`
            select
            l.descripcion ,
            l.fecha_publ,
            l.id_libro ,
            l.imagen, 
            l.nombre_archivo ,
            l.num_paginas ,
            l.titulo,
            a.nombre as autor,
            p.nombre as profesor,
            c.nombre as carrera

            from libros.libro as l right join inst.usuario as p on p.id_user = l.fk_creador
            right join libros.autor as a on l.fk_autor = a.id_autor
            right join libros.carrera as c on l.fk_carrera = c.id_carrera   
            where id_libro = ($1)`, [id]);
            if (reslut.length === 0) {
                return "no existe el id de esta carrera ";
            }
            else {
                return reslut;
            }
        }
        catch (error) {
            return error;
        }
    }
    async crear(libros, file) {
        const libro = JSON.parse(libros);
        try {
            if (!file || !file.buffer) {
                throw new common_1.HttpException('Archivo no válido', common_1.HttpStatus.BAD_REQUEST);
            }
            const pdfBuffer = file.buffer;
            const data = await pdfParse(pdfBuffer);
            const uniqueFileName = `${Date.now()}-${file.originalname}`;
            const pdfPath = path.join(process.env.Docs, uniqueFileName);
            const writeStream = fs.createWriteStream(pdfPath);
            writeStream.write(file.buffer);
            writeStream.end();
            await this.sql.query('INSERT INTO libros.libro (titulo, fecha_publ, descripcion, num_paginas, fk_creador, fk_autor, fk_carrera, nombre_archivo , imagen) VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7,$8)', [
                libro.titulo, libro.descripcion, data.numpages, libro.fk_creador, libro.fk_autor, libro.fk_carrera, uniqueFileName, libro.imagen
            ]);
            return 'Libro creado exitosamente';
        }
        catch (error) {
            console.error('Error al crear el libro con PDF:', error);
            throw new common_1.HttpException(`Error al crear el libro con PDF: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async eliminar(id) {
        try {
            await this.sql.query('DELETE FROM tramites.prestamo WHERE fk_libro = $1;', [id]);
            await this.sql.query('DELETE FROM  libros.libro WHERE  id_libro = $1;', [id]);
            return { mesage: 'eliminado ' };
        }
        catch (error) {
            return error;
        }
    }
    async editar(id, bod) {
        try {
            await this.sql.query('update libros.libro set nombre = $2 where  id_carrera = ($1)', [id, bod]);
            return "carrera actualusada  exitosamente ";
        }
        catch (error) {
            return error;
        }
    }
};
exports.LibroService = LibroService;
exports.LibroService = LibroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], LibroService);
//# sourceMappingURL=libro.service.js.map