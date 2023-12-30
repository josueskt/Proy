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
exports.CargaLLoteService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs = require("fs");
const path = require("path");
const sql_service_1 = require("../../sql/sql.service");
let CargaLLoteService = class CargaLLoteService {
    constructor(sql) {
        this.sql = sql;
    }
    async descargarArchivo(dato, id) {
        const directorioDestino = process.env.Docs;
        if (!directorioDestino) {
            throw new Error('La variable de entorno Docs no está configurada');
        }
        const googleDriveFileId = this.getDriveFileId(dato.archivo);
        const imagen_url = this.getDriveFileId(dato.imagen);
        const imagen = `https://drive.google.com/uc?id=${imagen_url}`;
        const url = `https://drive.google.com/uc?id=${googleDriveFileId}`;
        try {
            if (!fs.existsSync(directorioDestino)) {
                fs.mkdirSync(directorioDestino, { recursive: true });
            }
            const response = await (0, axios_1.default)({
                url,
                method: 'GET',
                responseType: 'stream',
            });
            const contentDisposition = response.headers['content-disposition'];
            const matches = contentDisposition.match(/filename="(.+)"$/);
            const nombreOriginal = matches ? matches[1] : `${Date.now()}-${googleDriveFileId}.pdf`;
            const filePath = path.join(directorioDestino, nombreOriginal);
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            await this.sql.query('INSERT INTO libros.libro (titulo, fecha_publ, descripcion, num_paginas, fk_creador, fk_autor, fk_carrera, nombre_archivo , imagen) VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7,$8)', [
                dato.titulo, dato.descripcion, 0, id, 2, dato.carrera, nombreOriginal, imagen
            ]);
            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        }
        catch (error) {
            console.error('Error al descargar o guardar el archivo:', error);
            throw new Error('Error al descargar o guardar el archivo');
        }
    }
    getDriveFileId(link) {
        const startIndex = link.indexOf('/d/') + 3;
        const endIndex = link.indexOf('/view');
        if (startIndex !== -1 && endIndex !== -1) {
            return link.substring(startIndex, endIndex);
        }
        else {
            return null;
        }
    }
    async libros_bloque(dato, id) {
        try {
            await this.descargarArchivo(dato, id);
        }
        catch (error) {
            console.error('Error en la función libros_bloque:', error);
        }
    }
};
exports.CargaLLoteService = CargaLLoteService;
exports.CargaLLoteService = CargaLLoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], CargaLLoteService);
//# sourceMappingURL=carga_l_lote.service.js.map