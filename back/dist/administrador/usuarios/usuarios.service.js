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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../../sql/sql.service");
const bcrypt = require("bcrypt");
let UsuariosService = class UsuariosService {
    constructor(sql) {
        this.sql = sql;
    }
    async delete_user(id) {
        if (id) {
            await this.sql.query('DELETE FROM inst.usuario where id_user = $1', [id]);
            return { "message": "usuario" + id + " eliminado " };
        }
        else {
            throw "no se a encontrado el usuario";
        }
    }
    async register(usuarios) {
        const asaltos = 10;
        try {
            for await (const user of usuarios) {
                var existe = await this.sql.query('Select id_user from inst.usuario where id_user = $1', [user.id_user]);
                if (existe.length) {
                    console.log("usuario existente");
                }
                if (!existe.length) {
                    const salt = await bcrypt.genSalt(asaltos);
                    const hashedPassword = await bcrypt.hash(user.password, salt);
                    this.sql.query('INSERT INTO inst.usuario(id_user,email,password,nombre,fk_rol) values($1,$2,$3,$4,$5)', [user.id_user,
                        user.email,
                        hashedPassword,
                        user.nombre,
                        user.fk_rol]);
                    console.log("usuario creado");
                }
            }
            return "usuario o usuaioos creados ";
        }
        catch (error) {
            console.log(error);
        }
    }
    async get_rol() {
        const reslut = await this.sql.query('select u.id_user, u.email ,u.nombre, r.nombre_rol from inst.usuario as u left join inst.rol as r  ON u.fk_rol = r.id_rol');
        return reslut;
    }
    async get_usets() {
        const reslut = await this.sql.query('select nombre_rol from inst.rol');
        return reslut;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map