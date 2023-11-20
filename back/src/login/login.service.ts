import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class LoginService {

    constructor(public sql: SqlService) { }
    async Login(correo :String , password:String) {
        try {
            return await this.sql.query('select * from  libros.materia')


        } catch (error) {
            return error
        }
    };


    }
