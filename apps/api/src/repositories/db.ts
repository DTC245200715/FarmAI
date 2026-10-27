/**
 * Database Repository (MySQL Connection Pool & In-memory Fallback)
 */
import mysql from 'mysql2/promise';
import { ENV } from '../config/env';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: ENV.DB_HOST,
      user: ENV.DB_USER,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function checkDbConnection(): Promise<{
  connected: boolean;
  mode: 'mysql_live' | 'in_memory_simulation';
  message: string;
}> {
  try {
    const p = getDbPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    return {
      connected: true,
      mode: 'mysql_live',
      message: 'Kết nối CSDL MySQL 8.0 thành công',
    };
  } catch (err: any) {
    return {
      connected: false,
      mode: 'in_memory_simulation',
      message: 'Đang chạy chế độ In-Memory Simulation Fallback',
    };
  }
}

