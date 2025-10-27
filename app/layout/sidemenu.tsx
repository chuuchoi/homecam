// app/layout/sidemenu.tsx
import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { cn } from "~/lib/utils";

const navItems = [
  { group: "카테고리" , children:[
    { name: "전체", path: "/store/category/all" },
    { name: "월간 인기모델", path: "/store/category/monthly" },
    { name: "주간 인기모델", path: "/store/category/weekly" },
    { name: "신규 출시모델", path: "/store/category/new" },
  ]},
  { group: "감지종류" , children:[
    { name: "모션감지 모델", path: "/store/detection/motion" },
    { name: "소리감지 모델", path: "/store/detection/sound" },
  ]},
  { group: "감지대상" , children:[
    { name: "사람", path: "/store/detection/person" },
    { name: "동물", path: "/store/detection/animal" },
  ]},
];

export default function SideMenu() {
  const location = useLocation();
  const cur = useMemo(() => {
    const allItems = navItems.flatMap(group => group.children);
    const match = allItems.find(item => location.pathname.startsWith(item.path));
    return match?.name || "";
  }, [location.pathname]);

  const toggleGroup = (name: string) => {
    const target = document.getElementById(name)
    if(target){
      target.style.maxHeight = target.style.maxHeight==='0px'?`${target.scrollHeight}px`:'0px'
    }
  };

  return (<>
  <div className="w-full bg-amber-50 h-91 relative">
    <img src="/캡처1.png" alt="banner" className="w-full h-full object-cover object-left"/>
    <p className="absolute bottom-15 left-80 text-white text-xl font-bold">
      <span className="font-extrabold text-6xl">Event detection</span><br/>
      더 많은 이벤트 감지를 통해 365일 안전하게 관리하세요.
    </p>
  </div>
  <div className="flex bg-black justify-center">
    <aside className="w-56 min-w-fit bg-black text-white shadow-md border-b-2 border-blue-700 flex flex-col">
      <div className="sticky top-20 px-8 py-4">
        {/* 네비게이션 */}
        <nav className="flex flex-col text-md gap-6">
          {navItems.map((item) => {
          return <div key={item.group}>
            <div className="text-neutral-500 font-bold text-sm mb-1 cursor-pointer"
              onClick={()=>{toggleGroup(item.group)}}>{item.group}</div>
            <div id={item.group} className="flex flex-col gap-1 overflow-hidden max-h-96 transition-all duration-300">
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className={cn(
                    "hover:text-blue-400",
                    cur === child.name && "text-blue-500 font-semibold translate-x-3 transition-transform duration-400 ease-out"
                  )}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
          })}
        </nav>
      </div>
    </aside>
    <div className="w-2xl flex-1 max-w-[1680px]">
      <Outlet />
    </div>
  </div>
</>);
}
