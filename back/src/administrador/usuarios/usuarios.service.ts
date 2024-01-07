import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.interface';
import { SqlService } from 'src/sql/sql.service';
import * as bcrypt from 'bcrypt';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class UsuariosService {
  constructor(public sql: SqlService) {}

  async delete_user(id: number) {
    if (id) {
      await this.sql.query('DELETE FROM inst.usuario where id_user = $1', [id]);
      return new MessageDto(`usuario ${id} eliminado`);
    } else {
        throw new NotFoundException(new MessageDto('No se encontro el usuario'));
    }
  }
  async register(usuarios: Usuario[]) {
    const asaltos = 10;
    try {
      for await (const user of usuarios) {
        const existe = await this.sql.query(
          'Select id_user from inst.usuario where id_user = $1',
          [user.id_user],
        );
        if (existe.length) {
          new MessageDto('Usuario ya existe');
        }
        if (!existe.length) {
          const salt = await bcrypt.genSalt(asaltos);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          this.sql.query(
            'INSERT INTO inst.usuario(id_user,email,password,nombre,fk_rol) values($1,$2,$3,$4,$5)',
            [
              user.id_user,
              user.email,
              hashedPassword,
              user.nombre,
              user.fk_rol,
            ],
          );
          new MessageDto('Usuario creado');         
        }
      }
      return new MessageDto('Usuarios creados');
    } catch (error) {      
      throw new NotFoundException(new MessageDto('Error al crear usuarios'));
    }
  }

  async get_rol() {
    const reslut = await this.sql.query(
      'select u.id_user, u.email ,u.nombre, r.nombre_rol from inst.usuario as u left join inst.rol as r  ON u.fk_rol = r.id_rol',
    );
    return reslut;
  }

  async get_usets() {
    const reslut = await this.sql.query('select nombre_rol from inst.rol');
    return reslut;
  }
}
