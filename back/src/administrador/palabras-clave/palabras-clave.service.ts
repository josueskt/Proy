import { Injectable } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Injectable()
export class PalabrasClaveService {

    constructor(private sql:SqlService){}
    async Generar_palabras(palabras:string, id:string){
    const Palabras_separadas = palabras.split(',');
    const palabrasSinEspacios = Palabras_separadas.map(palabra => palabra.trim());


    



     for(let palabra of palabrasSinEspacios){
        try{
        
     const existe =  await this.sql.query('SELECT id_palabra FROM libros.palabras_clave WHERE nombre = $1', [palabra])

     if(!existe[0]){
       



        
        const id_palabra =  await this.sql.query('INSERT INTO libros.palabras_clave(nombre)VALUES($1) RETURNING id_palabra', [palabra])
        const id_P = id_palabra[0].id_palabra
     await this.sql.query('INSERT INTO libros.palabras_libro(fk_libro,fk_palabra)VALUES($1,$2)', [id,id_P])
     
     }
     else{

       
        const id_P = existe[0].id_palabra

     await this.sql.query('INSERT INTO libros.palabras_libro(fk_libro,fk_palabra)VALUES($1,$2)', [id,id_P])

     }
    


     }
    catch(error){
        throw error
    }
   

}

}
}
