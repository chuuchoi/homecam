// app/layout/mobile-layout.tsx
import { Outlet, useNavigate } from "react-router";

const Icons = {
  Record: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>,
  Alarm: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
  Tracking: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>,
  Sound: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>,
  Mic: () => <svg width="28" height="28" fill="#2563eb" viewBox="0 0 24 24"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" /><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" /></svg>,
};

export default function MobileBottomTabs() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Outlet />

      {/* 🔉 하단 툴바 */}
      <nav className="fixed bottom-0 w-full h-20 bg-[#0F0F0F] p-6 rounded-t-3xl flex justify-between items-center">

                <ToolbarButton icon={<Icons.Record />} label="녹화" />
                <ToolbarButton icon={<Icons.Alarm />} label="경보" />
                
                {/* 마이크 버튼 (중앙 강조) */}
                <div className="flex flex-col items-center justify-center gap-2 mb-2">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20 active:scale-95 transition-transform">
                        <Icons.Mic />
                    </button>
                </div>

                <ToolbarButton icon={<Icons.Tracking />} label="추적" />
                <ToolbarButton icon={<Icons.Sound />} label="사운드" />


      </nav>
    </div>
  );
}


// 하단 툴바 버튼 컴포넌트
function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div className="text-white group-active:text-gray-300 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] text-gray-400 group-active:text-gray-500">
        {label}
      </span>
    </button>
  );
}