import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import * as bcrypt from 'bcrypt';
import { MessageDto } from 'src/common/message.dto';
@Injectable()
export class CambioContraService {
  constructor(private sql: SqlService) {}
  async Contra(id: string, Contra: string) {
    try {
      const hashedPassword = await bcrypt.hash(Contra, 10);
      const reslut = await this.sql.query(
        'UPDATE inst.usuario Set password = $1, cambio =true where id_user = $2',
        [hashedPassword, id],
      );
      return reslut;
    } catch (error) {
      return new MessageDto(`Error al cambiar la contraseña, error: ${error}`);
    }
  }
}
