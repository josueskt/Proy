import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class LibroTipoService {

constructor(private sql:SqlService){}
 async crear(nombre:string){
    try {
        return await this.sql.query('INSEET INTO libros.tipo (nombre) values ($1)',[nombre])


    } catch (error) {
        return error
    }
 }  
 async trae(){
    try {
        return await this.sql.query('select * from  libros.tipo')


    } catch (error) {
        return error
    }

 }
 async eliminar(id:number){

    try {
        return await this.sql.query('Delete from libros.tipo where id_tipo = $1',[id])


    } catch (error) {
        return error
    }



 }

}
