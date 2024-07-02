import { Injectable, UnauthorizedException,  } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import { login } from './login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MessageDto } from 'src/common/message.dto';
//import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class LoginService {
  private readonly jwtSecretKey = process.env.Key_Key;
  constructor(public sql: SqlService) {}
  async Login(datos: login) {
    try {
      const cedula = datos.cedula;
      const password = datos.password;
      const result = await this.sql.query(
        'SELECT u.id_user , u.activo, u.email,u.password,u.nombre ,r.nombre_rol  FROM inst.usuario AS u INNER JOIN inst.rol AS r ON u.fk_rol = r.id_rol where email = ($1);',
        [cedula],
      );

      if (result.length === 1) {
        const user = result[0];
        if(!user.activo){
         return new UnauthorizedException(new MessageDto('Este usuario no esta activo '));        
           
        }else{
          var passwordMatch = await bcrypt.compare(password, user.password);

        }

        // Verificar la contraseña

        if (passwordMatch) {
          const token = jwt.sign(
            {
              id_user: user.id_user,
              email: user.email,
              nombre: user.nombre,
              nombre_rol: user.nombre_rol,
            },
            this.jwtSecretKey,
            { expiresIn: '1h' }, 
          );

          this.sql.query(
            'INSERT INTO inst.secion(fk_user,fecha) values($1,CURRENT_DATE)',
            [user.id_user],
          );

          return { token };
        } else {
         return new UnauthorizedException(new MessageDto('contraseña errónea'));        
        }

      } else {
        return new UnauthorizedException(new MessageDto('no existe el usuario'));        
      }
    } catch (error) {
      return new UnauthorizedException(new MessageDto(`Error: ${error} exeption`));      
    }
  }
}
