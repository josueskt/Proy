import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import { login } from './login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
    private readonly jwtSecretKey = 'AU1234_ggqqgato$$ap';
    constructor(public sql: SqlService) { }
    async Login(datos: login) {
        try {

            const cedula = datos.cedula
            const password = datos.password
            const result = await this.sql.query('SELECT u.id_user , u.email,u.password,u.nombre ,r.nombre_rol  FROM inst.usuario AS u INNER JOIN inst.rol AS r ON u.fk_rol = r.id_rol where id_user = ($1);', [cedula])

            if (result.length === 1) {
                const user = result[0];

                // Verificar la contraseña
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const token = jwt.sign(
                        { id_user: user.id_user, email: user.email, nombre: user.nombre, nombre_rol: user.nombre_rol },
                        this.jwtSecretKey,
                        { expiresIn: '1h' } // Configura la expiración del token según tus necesidades
                      );
            
                      return { token };
            

                } else {
                    return { message: 'Contraseña incorrecta' };
                }
            } else {
                return { message: 'Usuario no encontrado' };

            }
        } catch (error) {
            return { message: 'Error en la autenticación', error };
        }
    }


}
