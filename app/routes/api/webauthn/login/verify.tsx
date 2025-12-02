// app/routes/api/webauthn/login/verify.tsx
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import type { ActionFunctionArgs } from "react-router";
import { credentialStore } from "../register/verify";
import { sessionStore } from "./options";
import { generateToken } from "~/lib/auth";
import { pool } from "~/lib/db";

export const action = async ({ request }:ActionFunctionArgs) => {
  const body = await request.json();
  const { userId, assertionResponse } = body;
console.log(userId,sessionStore)
  const expectedChallenge = sessionStore[userId];
  if (!expectedChallenge) return { ok: false, message: "Challenge 없음" };
  delete sessionStore[userId];


  // TODO: DB에서 credential 불러오기
  const userCredential = credentialStore[userId];
  if (!userCredential) return { ok: false, message: "등록된 패스키 없음" };
  delete credentialStore[userId];


  try {
    const verification = await verifyAuthenticationResponse({
      response: assertionResponse,
      expectedChallenge,
      expectedOrigin: "http://localhost:5173",
      expectedRPID: "localhost",
      credential: userCredential,
      requireUserVerification: false, // ★ UV 없어도 pass
    });

    if (verification.verified) {
      // 로그인 성공 후 counter 업데이트
      userCredential.counter = verification.authenticationInfo.newCounter ?? userCredential.counter;

      // DB에서 사용자 정보 조회
      const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);
      const user: any = Array.isArray(rows) && rows[0];
      if (!user) return { ok: false, message: "사용자 정보 없음" };

      // JWT 토큰 발행
      const token = generateToken({
        id: user.id,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
      });

      const redirectTo = user.id === "123123" ? "/admin" : "/";

      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
          Location: redirectTo,
        },
      });
    }

    return { ok: false, message: "로그인 실패" };
  } catch (err) {
    console.error(err);
    return { ok: false, message: "서버 에러" };
  }
};
