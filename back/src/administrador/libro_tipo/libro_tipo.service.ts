import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/common/message.dto';
import { SqlService } from 'src/sql/sql.service'; @Injectable()
export class LibroTipoService { constructor(private sql:SqlService){}  async crear(nombre:string){
    try {
         await this.sql.query('INSERT INTO libros.tipo (nombre) values ($1)',[nombre])
         return new MessageDto('Tipo de libro creado exitosamente' );     } catch (error) {
        return error
    }
 }  async trae(){
    try {
        return await this.sql.query('select * from  libros.tipo')     } catch (error) {
        return error
    }  }
 async eliminar(id:number){     try {
        await this.sql.query('Delete from libros.tipo where id_tipo = $1',[id])
        return new MessageDto('Tipo de libro eliminado exitosamente' );     } catch (error) {
        return error
    }  } }
