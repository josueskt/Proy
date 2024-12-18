import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistroUsuarioService {



    constructor(public sql: SqlService) { }
    async restablecer(user){
      

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.user, salt);
      this.sql.query(
          'Update inst.usuario set password = $1 , cambio=false where id_user = $2',[hashedPassword,user.user])
return new MessageDto('Contraseña restablecida exitosamente');
    }
   
    async register(user:any) {
      const asaltos = 10;
      try {
       
          const existe = await this.sql.query(
            'Select id_user from inst.usuario where email = $1',
            [user.email],
          );
          if (existe.length) {
           return  new MessageDto('El correo ya existe');
          }

          const existes = await this.sql.query(
            'Select id_user from inst.usuario where id_user = $1',
            [user.cedula],
          );
          if (existes.length) {
           return  new MessageDto('El usuario ya existe');
          }

          if (!existe.length && !existes.length) {
            const salt = await bcrypt.genSalt(asaltos);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            this.sql.query(
                'INSERT INTO inst.usuario(id_user,email,password,nombre,fk_rol,activo) values($1,$2,$3,$4,$5,$6)',
                [
                  user.cedula,
                  user.email,
                  hashedPassword,
                  user.nombre,
                  user.fk_rol,
                  true
                ],
              );
            
          }
        
        return new MessageDto('Usuario creado');
      } catch (error) {
        throw new NotFoundException(new MessageDto('Error al crear usuarios '+error));
      }
    }
  
   
  
  
    
  
  
    




}
