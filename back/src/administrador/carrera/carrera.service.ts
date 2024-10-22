import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service';
import { carrera } from './carrera.interface';

@Injectable()
export class CarreraService {

    constructor(private readonly sql: SqlService) {

    }

    async traer() {
        const reslut = await this.sql.query('select * from Libros.carrera')
        return reslut

    }

    async by_id(id: number) {
        try {
            const reslut = await this.sql.query('select * from Libros.carrera where id_carrera = ($1)', [id])
            if (reslut.length === 0) {
                return new BadRequestException(new MessageDto('No se encontro la carrera'));

            } else { return reslut }
        } catch (error) {
            return error
        }
    }
    async crear(mod: carrera) {

        try {
            await this.sql.query('INSERT INTO libros.carrera (nombre) values ($1)', [mod.nombre])

        } catch (error) {
            return error
        }

    }

    async eliminar(id: number) {
        try {

            await this.sql.query('delete from  libros.carrera where  id_carrera = $1', [id])
            return new MessageDto('Carrera eliminada exitosamente');

        } catch (error) {
            return error
        }
    }
    async editar(id: number, bod: any) {
        const ap = bod.nombre
        try {
            await this.sql.query('update libros.carrera set nombre = $2 where  id_carrera = ($1)', [id, ap])
            return new MessageDto('Carrera editada exitosamente');

        } catch (error) {
            return error
        }

    }

}
