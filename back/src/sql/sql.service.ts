import { Injectable } from '@nestjs/common';
import { error } from 'console';
import {Pool , PoolClient} from 'pg'
@Injectable()
export class SqlService {
    private readonly pool:Pool;

    constructor(){
      this.pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database:'bibliotec',
    
    port:5432
    
    
      })
    }
    async query(sql:string,params?:any[]):Promise<any>{
    let client :PoolClient
     try{
        const client = await this.pool.connect();
      const result = await client.query(sql,params)
      return result.rows;
    }catch(error){
        console.log('error base de datos',error.message)

    }
    finally{
        if(client){
            client.release();
        }
      
    }
    
    
    }
}
