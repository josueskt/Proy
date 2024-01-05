import { Controller, Get, Post } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Controller('test')
export class TestController {
constructor(private readonly sql:SqlService){

}

@Get()
async traer(): Promise<any>{

    const reslut = await this.sql.query('select * from libros.nacionalidad')
    return reslut

}
@Post()
    async guardad(){
        
        const values = ["Velesolana"]
        try{
            const reslut = await this.sql.query(`INSERT INTO libros.nacionalidad (nombre) VALUES ($1)`, values)
        }catch(error){
console.log(error)
        }
    
   
    
}

}
