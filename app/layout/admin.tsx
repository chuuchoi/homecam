// app/layout/header.tsx
import { Link, Outlet, useLocation, redirect, type LoaderFunctionArgs } from "react-router";
import { cn } from "~/lib/utils"; // 선택: className 조합 함수
import { getUserFromRequest } from "~/lib/auth";
import { useMemo, useState } from "react";
import type { Route } from "./+types/admin";
import { HeaderDropdown } from "./header";
import { AdminSideIcon, SearchIcon } from "~/components/icons";

const navItems = [
  { name: "메인화면", path: "/admin/home" },
  { name: "매출", path: "/admin/sales" },
  { name: "개발자 관리", path: "/admin/developers" },
  { name: "고객 관리", path: "/admin/customers" },
  { name: "커뮤니티 관리", path: "/admin/community" },
  { name: "통계", path: "/admin/analytics" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const loginInfo = getUserFromRequest(request)
  if(loginInfo?.id !== '123123') throw redirect('/')
  return loginInfo
}

export default function Header({loaderData}:Route.ComponentProps) {
  const loginInfo = loaderData;
  const location = useLocation();
  
  const cur = useMemo(()=>{
    const match = navItems.find(item => location.pathname.startsWith(item.path));
    return match?.name || "";
  },[location.pathname])

  const [search, setSearch] = useState("");

  return (<>
    <div className="flex w-full min-w-fit">
      <aside className="sticky top-0 w-3xs max-h-screen bg-black text-white shadow-md overflow-auto" style={{scrollbarWidth:'thin'}}>
        <div className="min-h-[100vh] flex flex-col bg-neutral-800 gap-12 px-6 py-3">
          {/* 로고 */}
          <div className="flex flex-col">
            <span className="text-3xl text-center font-bold">HOME</span>
            <span className="text-blue-500 text-center leading-3">for admin</span>
          </div>

          {/* 네비게이션 */}
          <nav className="flex flex-col text-md gap-10 overflow-auto" style={{scrollbarWidth:'thin'}}>
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "hover:text-blue-400 flex gap-2 items-center ml-6",
                  cur === item.name && "text-blue-500 font-semibold transition-transform duration-400"
                )}
              >
                <AdminSideIcon n={idx} color="currentColor"/>
                <span>
                {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-2 w-full bg-white text-white shadow-md">
          <div className="flex items-center justify-between px-6 py-3">
            {/* SearchBar */}
            <div className="relative">
              <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3"
                color='var(--color-blue-600)'
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search"
                className="bg-[#ededed] rounded-full px-4 py-2 pl-11 w-64 outline-none text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
            
            {/* 사용자 이메일 + 드롭다운 */}
            <div className="text-sm text-black">
              {loginInfo?.email} 
              <HeaderDropdown />
            </div>
          </div>
        </header>
        <Outlet context={{search}}/>
      </div>
    </div>
  </>
  );
}
