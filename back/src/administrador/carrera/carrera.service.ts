import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class CarreraService {


    constructor(private readonly sql: SqlService) {

    }

    async traer(): Promise<any> {

        const reslut = await this.sql.query('select * from Libros.carrera')
        return reslut


    }

    async by_id(id: Number): Promise<any> {
        try {
            const reslut = await this.sql.query('select * from Libros.carrera where id_carrera = ($1)', [id])
            if(reslut.length === 0){
             return "no existe el id de esta carrera "
            }else{return reslut}
        } catch (error) {
            return error
        }


    }


    async crear(nombre: String) {


        try {
             await this.sql.query('INSERT INTO libros.carrera (nombre) values ($1)', [nombre])
            return "carrera creada exitosamente "
            
        } catch (error) {
            return error
        }

    }

    async eliminar(id: Number) {


        try {
            await this.sql.query('delete from  libros.carrera where  id_carrera = ($1)', [id])
           return "carrera eliminada exitosamente "
           
       } catch (error) {
           return error
       }
    }
    async editar(id: Number , bod:any) {
        const ap = bod.nombre
        try {
            await this.sql.query('update libros.carrera set nombre = $2 where  id_carrera = ($1)', [id , ap])
           return "carrera actualusada  exitosamente "
           
       } catch (error) {
           return error
       }

    }





}
