// app/routes/api/webauthn/login/options.tsx
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import type { ActionFunctionArgs } from "react-router";
import { credentialStore } from "../register/verify";

// 임시 세션 저장용 (실제 DB/Redis 권장)
export const sessionStore: Record<string, string> = {};

export const action = async ({ request }:ActionFunctionArgs) => {
  const body = await request.json();
  const userId = body.userId;

  if (!userId) return { ok: false, message: "userId 필요" };
  console.log('====== userId :',userId)

  // TODO: DB에서 유저 credential 불러오기
  const userCredential = credentialStore[userId];
  if (!userCredential) return { ok: false, message: "등록된 패스키 없음" };

  //rpID
  const host = new URL(request.url).host;
  const domain = host.split(':')[0];

  const options = await generateAuthenticationOptions({
    rpID: domain,
    allowCredentials: [
      {
        id: userCredential.id,
        transports: userCredential.transports ?? ["internal"],
      },
    ],
    userVerification: "discouraged"
  });

  // 서버 세션/임시 저장용
  sessionStore[userId] = options.challenge;

  return { ok: true, options };
};
