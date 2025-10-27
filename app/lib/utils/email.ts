// lib/utils/email.ts
import nodemailer from "nodemailer";
console.log('nodemailer')
console.log(process.env.SMTP_USER)
console.log(process.env.SMTP_PASS)
console.log('====================')
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export async function sendEmailTempPassword(to: string, tempPassword: string) {
  const info = await transporter.sendMail({
    from: `"홈캠" <${process.env.SMTP_USER}>`,
    to,
    subject: "임시 비밀번호 안내",
    html: `<p>임시 비밀번호: <b>${tempPassword}</b></p>`,
  });

  return info;
}

export async function sendEmailVerificationCode(to: string, code: string) {
  const info = await transporter.sendMail({
    from: `"홈캠" <${process.env.SMTP_USER}>`,
    to,
    subject: "홈캠 인증 코드",
    html: `<p>인증 코드: <strong>${code}</strong></p>`,
  });

  return info;
}

