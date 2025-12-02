// app/layout/auth-anon-only.tsx
import { Outlet, redirect, type LoaderFunctionArgs, type ClientLoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/lib/auth";
import { Link } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/auth-anon-only";

export async function loader({ request }: LoaderFunctionArgs) {
  // console.log('m/auth-anon-only.tsx')
  const loginInfo = getUserFromRequest(request)
  const redirectTo = "/m/home";
  if(loginInfo) throw redirect(redirectTo)
  const msg = new URL(request.url).searchParams.get('msg')
  return msg
}

export function clientLoader({request}:ClientLoaderFunctionArgs){
  const url = new URL(request.url)
  const msg = url.searchParams.get('msg')

  // 깜빡임 최소화용 clientLoader에서 한번 msg 체크
  if(msg === 'need-login'){
    alert('로그인이 필요합니다.')
    url.searchParams.delete('msg')
    return redirect(url.toString())
  }
}

export default function AuthAnonOnlyLayout({loaderData}:Route.ComponentProps) {
  // 직접 주소창에 입력시 clientLoader 실행되지 않으므로 msg체크
  useEffect(() => {
    if (!loaderData) return;
    if (loaderData === "need-login") {
      alert("로그인이 필요합니다.");
      // 보통은 alert 후에 URL 정리도 같이 해줌
      const url = new URL(window.location.href);
      url.searchParams.delete("msg");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return <Outlet />
}
