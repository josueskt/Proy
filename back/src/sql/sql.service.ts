import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';


@Injectable()
export class SqlService {
  private readonly pool: Pool;


  user=  process.env.User
  host= process.env.Host
  database= process.env.Database
  password=process.env.Pass
  port= process.env.Port

  constructor() {
    
      
      
    this.pool = new Pool({
      user: this.user,
      host: this.host,
      database: this.database,
      password:this.password,
      port: this.port,
    });
  }

  async query(sql: string, params?: any[]): Promise<any> {
    let client: PoolClient;

    try {
     
      client = await this.pool.connect();
      const result = await client.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error('Database error:', error.message);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
