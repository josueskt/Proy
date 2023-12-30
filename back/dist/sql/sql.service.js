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
exports.SqlService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let SqlService = class SqlService {
    constructor() {
        this.user = process.env.User;
        this.host = process.env.Host;
        this.database = process.env.Database;
        this.password = process.env.Pass;
        this.port = process.env.Port;
        this.pool = new pg_1.Pool({
            user: this.user,
            host: this.host,
            database: this.database,
            password: this.password,
            port: this.port,
        });
    }
    async query(sql, params) {
        let client;
        try {
            client = await this.pool.connect();
            const result = await client.query(sql, params);
            return result.rows;
        }
        catch (error) {
            console.error('Database error:', error.message);
        }
        finally {
            if (client) {
                client.release();
            }
        }
    }
};
exports.SqlService = SqlService;
exports.SqlService = SqlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SqlService);
//# sourceMappingURL=sql.service.js.map