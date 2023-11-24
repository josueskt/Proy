import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.interface';
import { SqlService } from 'src/sql/sql.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(public sql: SqlService) { }

    async register(usuarios: Usuario[]) {

        const asaltos = 10;


        try {

            for await (const user of usuarios) {


                if(user.id_user.length <10){
                    console.log("hola")
                }


                var existe = await this.sql.query('Select id_user from inst.usuario where id_user = $1', [user.id_user])

                if (!existe.length) {


                    const salt = await bcrypt.genSalt(asaltos);

                    const hashedPassword = await bcrypt.hash(user.password, salt);

                    this.sql.query('INSERT INTO inst.usuario(id_user,email,password,nombre,fk_rol) values($1,$2,$3,$4,$5)',
                        [user.id_user,
                        user.email,
                            hashedPassword,
                        user.nombre,
                        user.fk_rol])

                    console.log("usuario creado")

                    
                }
                
              


            }
            return "usuario o usuaioos creados "
        } catch(error) {
            console.log(error)

        }
      

    }

    async get_rol(){


            const reslut = await this.sql.query('select nombre_rol from inst.rol')
            return reslut
    
    
        



    }





}


