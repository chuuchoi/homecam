// app/lib/db/user.ts

import { pool } from "../db";

/**
 * 이메일이 이미 존재하는지 확인
 * @param email 확인할 이메일
 * @returns 존재하면 true, 없으면 false
 */
export async function isEmailTaken(email: string): Promise<boolean> {
  const [rows] = await pool.execute("SELECT 1 FROM users WHERE email = ?", [email]);
  return (rows as any[]).length > 0;
}