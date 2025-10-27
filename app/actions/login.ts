// app/actions/login.ts
import type { ActionFunctionArgs } from "react-router";
import { pool } from "~/lib/db";
import { comparePassword } from "~/lib/utils/password";
import { generateToken } from "~/lib/auth";

export async function loginAction({ request }: ActionFunctionArgs)
{
  const formData = await request.formData();
  const id = formData.get("id");
  const password = formData.get("password");

  if (!id || !password) {
    return { message: "아이디와 비밀번호를 입력해주세요." }
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    const user:any = Array.isArray(rows) && rows[0];

    if (user && comparePassword(password as string, user.password)) {
      const token = generateToken({id:user.id, email:user.email, phone:user.phone, profile:user.profile});

      // ✅ 관리자면 /admin 으로 리디렉션
      const redirectTo = user.id === "123123" ? "/admin" : "/";

      return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
            Location: redirectTo,
          },
      });
    }

    return { success: false, message: "아이디 또는 비밀번호가 잘못되었습니다." }
  } catch (err: any) {
    return { success: false, message: "서버 오류 발생: " + err.message }
  }
}
