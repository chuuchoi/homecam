// app/api/find-pw.tsx
import type { ActionFunctionArgs } from "react-router";
import { pool } from "~/lib/db";
import { hashPassword, generateTemporaryPassword } from "~/lib/utils/password";
import { sendEmailTempPassword } from "~/lib/utils/email";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();
    const email = body.email?.trim();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "이메일이 필요합니다." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 해당 이메일 유저 존재 여부 확인
    const [rows]: any = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (!rows.length) {
      return new Response(
        JSON.stringify({ error: "존재하지 않는 이메일입니다." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const userId = rows[0].id;

    // 임시 비밀번호 생성 및 해싱
    const tempPassword = generateTemporaryPassword(); // 예: 8자리 랜덤 문자열
    const hashed = hashPassword(tempPassword);

    await pool.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashed, userId]
    );

    // 이메일 전송
    await sendEmailTempPassword(email, tempPassword);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("비밀번호 찾기 오류:", e);
    return new Response(
      JSON.stringify({ error: "서버 오류" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
