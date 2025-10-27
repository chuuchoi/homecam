// app/lib/utils/password.ts
import crypto from 'crypto';

export const hashPassword = (password: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
};

export const comparePassword = (plainPassword: string, hashedPassword: string) => {
    const hashedPlainPassword = hashPassword(plainPassword);
    return hashedPlainPassword === hashedPassword;
}; 

// 임시 비밀번호 생성 함수
export function generateTemporaryPassword() {
    // 숫자 + 영문자 조합으로 8자리 생성
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let temp = '';
    for (let i = 0; i < 8; i++) {
        temp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return temp;
}

export function generateVerificationCode(length = 6): string {
return Math.random().toString().slice(2, 2 + length);
}