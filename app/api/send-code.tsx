// app/api/send-code.tsx
import type { ActionFunctionArgs } from "react-router";
import { sendEmailVerificationCode } from "~/lib/utils/email";
import { generateVerificationCode } from "~/lib/utils/password";

//🔥메모리 누수 위험 (Map 대신 세션 / DB / Redis 등을 사용할 것)
const codeMap = new Map<string, string>(); // 임시 메모리 저장

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();
    const email = body.email?.trim();

    if (!email) {
      return new Response(JSON.stringify({ error: "이메일이 필요합니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const code = generateVerificationCode();
    codeMap.set(email, code);

    await sendEmailVerificationCode(email, code);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("이메일 인증 코드 전송 실패:", err);

    return new Response(
      JSON.stringify({
        error: "인증 코드를 전송하는 중 오류가 발생했습니다.",
        detail: err?.message ?? "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


// 검증용 유틸 (예: 다른 서버 라우트에서 사용)
export function verifyCode(email: string, inputCode: string): boolean {
  const savedCode = codeMap.get(email);
  return savedCode === inputCode;
}
