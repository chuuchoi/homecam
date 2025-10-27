// app/actions/register.ts
import type { ActionFunctionArgs } from "react-router";
import { hashPassword } from "~/lib/utils/password";
import { pool } from "~/lib/db";
import { isEmailTaken } from "~/lib/db/user";
import { verifyCode } from "~/routes/api/send-code";

export async function registerAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const passwordConfirm = formData.get("passwordConfirm")?.toString() || "";
    const code = formData.get("code")?.toString() || "";
    
    if ( !email || !password || !passwordConfirm ) {
      return { message: "모든 필드를 입력해주세요." };
    }
    if (password !== passwordConfirm) {
      return { message: "비밀번호가 일치하지 않습니다." };
    }
    if (await isEmailTaken(email)) {
      return { message: "이미 등록된 이메일입니다." };
    }

    const valid = verifyCode(email, code);
    if (!valid) {
      return new Response(JSON.stringify({ message: "인증 코드가 일치하지 않습니다." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = hashPassword(password);

    const query = `
      INSERT INTO users (email, password, id, name, phone, profile)
      VALUES (?, ?, ?, ?, ?, null)
    `;
    const values = [ email, hashedPassword , email,'name','phone'];

    await pool.execute(query, values);

    return { message: "회원가입이 완료되었습니다." };
  } catch (err: any) {
    // 예: 중복된 ID/이메일 등
    return { message: `회원가입 실패: ${err.message}` };
  }
}
