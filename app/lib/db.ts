import 'dotenv/config'; //빌드된 환경에서 process.env 읽으려면 필요
import mysql from 'mysql2/promise';
console.log('DB 연결 정보')
console.log('DB host:',process.env.DB_HOST)
console.log('DB name:',process.env.DB_NAME)
console.log('======================')

export const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
