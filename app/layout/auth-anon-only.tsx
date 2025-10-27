// app/layout/auth-anon-only.tsx
import { Outlet, redirect, type LoaderFunctionArgs, type ClientLoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/lib/auth";
import { Link } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const loginInfo = getUserFromRequest(request)
  const redirectTo = loginInfo?.id === "123123" ? "/admin" : "/";
  if(loginInfo) throw redirect(redirectTo)
  return null
}

export function clientLoader({request}:ClientLoaderFunctionArgs){
  const url = new URL(request.url)
  const msg = url.searchParams.get('msg')
  if(msg === 'need-login'){
    alert('로그인이 필요합니다.')
    url.searchParams.delete('msg')
    return redirect(url.toString())
  }
}

export default function AuthAnonOnlyLayout() {
  return <>
    <header className="sticky top-0 z-1 w-full bg-black text-white shadow-md border-b-2 border-blue-700">
      <div className="flex items-center gap-16 px-6 py-3">
        {/* 로고 */}
        <Link to={'/'} className="cursor-pointer text-xl font-bold flex flex-col">
          <span style={{fontSize:'36px', lineHeight:'1'}}>HOME </span>
          <span className="text-gray-400 text-xs">Security everyday</span>
        </Link>

        <h1>계정</h1>
      </div>
    </header>
    <Outlet />
  </>
}
