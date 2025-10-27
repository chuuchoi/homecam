// app/layout/developer.tsx
import type { Route } from "./+types/developer";
import { Link, Outlet, useLocation, type LoaderFunctionArgs, redirect } from "react-router";
import { cn } from "~/lib/utils"; // 선택: className 조합 함수
import { getUserFromRequest } from "~/lib/auth";
import { HeaderDropdown } from "./header";

const navItems = [
  { name: "창작공간", path: "/developers/workspace" },
  { name: "소식", path: "/developers/news" },
  { name: "매출", path: "/developers/sales" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const loginInfo = getUserFromRequest(request)
  if(loginInfo?.id !== '123123') return redirect('/community?msg=not-developer')
  return loginInfo
}

export default function Header({loaderData}: Route.ComponentProps) {
  const loginInfo = loaderData;
  const location = useLocation();

  return (<>
    <header className="w-full bg-black text-white shadow-md border-b-1 border-blue-700" style={{background:'linear-gradient(to Bottom, var(--color-neutral-950) 50%, var(--color-blue-600) 96%)'}}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* 로고 */}
        <Link to={'/'} className="text-xl font-bold cursor-pointer">
          <span>HOME </span>
          <span className="text-blue-500">DEVELOPER</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex space-x-6 text-md">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "hover:text-blue-400",
                location.pathname.startsWith(item.path) && "text-blue-500 font-semibold -translate-y-0.5 transition-transform duration-400"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 사용자 이메일 + 드롭다운 */}
        <div className="text-sm">
          {loginInfo?.email} 
          <HeaderDropdown />
        </div>
      </div>
    </header>
    <Outlet />
  </>
  );
}
