// app/routes/api/webauthn/register/options.tsx
import { generateRegistrationOptions } from "@simplewebauthn/server";
import type { ActionFunctionArgs } from "react-router";

// 임시 세션 저장용 (실제 DB/Redis 권장)
export const sessionStore: Record<string, string> = {};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.json();
  const userId = body.userId;

  if (!userId) return { ok: false, message: "userId 필요" };
  
  // 문자열을 Buffer로 변환
  const userIdBuffer = Buffer.from(userId, "utf-8");

  //ngrok URL test용
  const host = new URL(request.url).host;
  const domain = host.split(':')[0];

  // String values for `userID` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids
  const options = await generateRegistrationOptions({
    rpName: "My App",
    // rpID: "localhost",// 여기에 도메인 입력 (예: example.com)
    rpID: domain,// 여기에 도메인 입력 (예: example.com)
    userID: userIdBuffer,
    userName: userId,

    // UV 오류 :Error: User verification was required, but user could not be verified
    authenticatorSelection: {
      residentKey: "preferred",
      requireResidentKey: false,
      userVerification: "discouraged",
    },
    attestationType: "none",
  });

  sessionStore[userId] = options.challenge; // 서버 세션에 challenge 저장

  return { ok: true, options };
};
