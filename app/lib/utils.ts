import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { route } from "@react-router/dev/routes";

/**
 * 조건부 클래스 병합 함수
 * 
 * Tailwind 클래스가 충돌할 경우 마지막 클래스를 유지함
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

/**
 * 다운로드 수 포맷터 (예: 10100 -> "10.1k")
 * 소수점 1의 자리까지 toFixed(1)
 */
export const formatDownloads = (num: number): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(num);
};