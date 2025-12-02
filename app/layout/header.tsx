// app/layout/header.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import type { Route } from "./+types/header";
import { Link, Outlet, useLocation, type LoaderFunctionArgs, type ClientLoaderFunctionArgs, redirect } from "react-router";
import { cn } from "~/lib/utils";
import { useLogout } from "~/hooks/commons";
import { getUserFromRequest, type AuthUserPayload } from "~/lib/auth";

const navItems = [
  { name: "스토어", path: "/store" },
  { name: "커뮤니티", path: "/community" },
  { name: "개발", path: "/dev" },
  { name: "고객지원", path: "/support" },
];

export const loader = ({request}:LoaderFunctionArgs)=>{
  const loginInfo = getUserFromRequest(request)
  const msg = new URL(request.url).searchParams.get('msg')
  return {loginInfo, msg}
}

export async function clientLoader({serverLoader,request}:ClientLoaderFunctionArgs){
  // 깜빡임 최소화용 clientLoader에서 한번 msg 체크
  const serverData = await serverLoader<{loginInfo:AuthUserPayload|null, msg:string}>()
  const msg = serverData.msg
  if(msg){
    if(msg === 'need-login') alert('로그인이 필요합니다.')
    else if(msg === 'not-developer') alert('개발자 계정만 접근 가능합니다.')
    else if(msg === 'already-developer') alert('이미 개발자로 등록된 계정입니다.')
    const url = new URL(request.url)
    url.searchParams.delete('msg')
    return redirect(url.toString())
  }
  return serverData
}

export default function Header({loaderData}: Route.ComponentProps) {
  const {loginInfo, msg} = loaderData
  const location = useLocation();
  const cur = useMemo(()=>{
    const match = navItems.find(item => location.pathname.startsWith(item.path));
    return match?.name || "";
  },[location.pathname])
  
  // 직접 주소창에 입력시 clientLoader 실행되지 않으므로 msg체크
  useEffect(() => {
    if (!msg) return;

    if (msg === "need-login") {
      alert("로그인이 필요합니다.");
    } else if (msg === "not-developer") {
      alert("개발자 계정만 접근 가능합니다.");
    } else if (msg === "already-developer") {
      alert("이미 개발자로 등록된 계정입니다.");
    }
    // 보통은 alert 후에 URL 정리도 같이 해줌
    const url = new URL(window.location.href);
    url.searchParams.delete("msg");
    window.history.replaceState({}, "", url.toString());
  }, []);
  
  return (<div className="min-w-[1440px]">
    <header className="sticky top-0 z-2 w-full text-white shadow-md border-b border-blue-700" style={{background:'linear-gradient(to Bottom, var(--color-neutral-950) 50%, var(--color-blue-600) 96%)'}}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* 로고 */}
        <Link to={'/store'} className="text-xl font-bold flex flex-col">
          <span style={{fontSize:'36px', lineHeight:'1'}}>HOME </span>
          <span className="text-gray-400 text-xs">Security everyday</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex space-x-6 text-md">
          {navItems.map((item) => {
            return( <Link
              key={item.path}
              to={item.path}
              className={cn(
                "hover:text-blue-400",
                cur === item.name && "text-blue-500 font-semibold translate-y-2 transition-transform duration-400"
              )}
            >
              {item.name}
            </Link>
          )})}
        </nav>

        {/* 사용자이메일 + 드롭다운 | 로그인 버튼 */}
        {!loginInfo ?
          <Link to="login" className="text-sm">로그인</Link>
        :
          <div className="text-sm">
            {loginInfo?.email} 
            <HeaderDropdown />
          </div>
        }
      </div>
    </header>
    <Outlet context={{loginInfo}}/>
  </div>
  );
}

export const HeaderDropdown = () => {
  const logout = useLogout()
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setOpen(!open)} className="ml-2 cursor-pointer">
        ▼
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50 text-black">
          {/* <Link
            to="/my-page"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link> */}
          
            <button
              type="button"
              className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={logout}
            >
              로그아웃
            </button>
          
        </div>
      )}
    </div>
  );
};
