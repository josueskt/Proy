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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const sql_service_1 = require("../sql/sql.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let LoginService = class LoginService {
    constructor(sql) {
        this.sql = sql;
        this.jwtSecretKey = process.env.Key_Key;
    }
    async Login(datos) {
        try {
            const cedula = datos.cedula;
            const password = datos.password;
            const result = await this.sql.query('SELECT u.id_user , u.email,u.password,u.nombre ,r.nombre_rol  FROM inst.usuario AS u INNER JOIN inst.rol AS r ON u.fk_rol = r.id_rol where id_user = ($1);', [cedula]);
            if (result.length === 1) {
                const user = result[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign({ id_user: user.id_user, email: user.email, nombre: user.nombre, nombre_rol: user.nombre_rol }, this.jwtSecretKey, { expiresIn: '3000h' });
                    this.sql.query('INSERT INTO inst.secion(fk_user,fecha) values($1,CURRENT_DATE)', [user.id_user]);
                    return { token };
                }
                else {
                    return { message: 'Contraseña incorrecta' };
                }
            }
            else {
                return { message: 'Usuario no encontrado' };
            }
        }
        catch (error) {
            return { message: 'Error en la autenticación', error };
        }
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sql_service_1.SqlService])
], LoginService);
//# sourceMappingURL=login.service.js.map