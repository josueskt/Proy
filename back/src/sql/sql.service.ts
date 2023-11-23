import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class SqlService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'proy',
      password:"2062",
      port: 5432,
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
