// app/routes/api/webauthn/register/verify.tsx
import { verifyRegistrationResponse, type WebAuthnCredential } from "@simplewebauthn/server";
import type { ActionFunctionArgs } from "react-router";
import { sessionStore } from "./options";

// 임시 저장용 DB
export const credentialStore: Record<string, WebAuthnCredential> = {};

export const action = async ({ request }:ActionFunctionArgs) => {
  const body = await request.json();
  const { userId, attestationResponse } = body;
console.log(body)

  const expectedChallenge = sessionStore[userId];
  if (!expectedChallenge) return { ok: false, message: "Challenge 없음" };
  delete sessionStore[userId];

  try {
    const verification = await verifyRegistrationResponse({
      response: attestationResponse,
      expectedChallenge,
      expectedOrigin: "http://localhost:5173",
      expectedRPID: "localhost",
      requireUserVerification: false, // ★ UV 없어도 pass
    });

    if (verification.verified) {
      credentialStore[userId] = verification.registrationInfo.credential;

      // TODO: DB에 credential 저장
      return { ok: true, message: "패스키 등록 완료" };
    }

    return { ok: false, message: "패스키 등록 실패" };
  } catch (err) {
    console.error(err);
    return { ok: false, message: "서버 에러" };
  }
};
