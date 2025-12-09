// app/layout/mobile-layout.tsx
import { Outlet, useLocation, useNavigate } from "react-router";
// import { MobileNav } from "~/components/mobile-nav";

export default function MobileBottomTabs() {
  const navigate = useNavigate();
  //현재 location.pathname에 따라 하단 탭바의 버튼 색상 변경
  const currentPath = useLocation().pathname;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Outlet />

      {/* <MobileNav /> */}
      {/* ✅ 하단 탭바 */}
      <nav className="fixed bottom-0 w-full flex justify-around items-center h-16 border-t border-gray-800 bg-[#111] text-gray-400">
        <button
          onClick={() => navigate("/m/home")}
          className={currentPath.startsWith("/m/home") ? "flex flex-col items-center text-blue-500" : "flex flex-col items-center"}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs mt-1">홈</span>
        </button>
        <button
          onClick={() => navigate("/m/records")}
          className={currentPath.startsWith("/m/records") ? "flex flex-col items-center text-blue-500" : "flex flex-col items-center"}
        >
          <span className="text-xl">🔄</span>
          <span className="text-xs mt-1">기록</span>
        </button>
        <button
          onClick={() => navigate("/m/store")}
          className={currentPath.startsWith("/m/store") ? "flex flex-col items-center text-blue-500" : "flex flex-col items-center"}
        >
          <span className="text-xl">🛍️</span>
          <span className="text-xs mt-1">스토어</span>
        </button>
        <button
          onClick={() => { }}
          className={currentPath.startsWith("/m/menu") ? "flex flex-col items-center text-blue-500" : "flex flex-col items-center"}
        >
          <span className="text-xl">☰</span>
          <span className="text-xs mt-1">전체</span>
        </button>
      </nav>
    </div>
  );
}
