// app/api/verify-code.tsx
import type { ActionFunctionArgs } from "react-router";
import { verifyCode } from "./send-code";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
  const email = body.email?.trim();
  const code = body.code?.trim();

  if (!email || !code) {
    return new Response(JSON.stringify({ error: "입력값 부족" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const valid = verifyCode(email, code);
  if (!valid) {
    return new Response(JSON.stringify({ error: "인증 실패" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
