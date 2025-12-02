// app/routes/m/device/$id.tsx
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import dummyDevices from "../dummyDevices.json";

const Icons = {
  Back: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  Settings: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.72 1.076.72 1.66v2.16c0 .585-.225 1.23-.72 1.66m-8.91-1.44h.008v.008h-.008V12zm.008 2.25h-.008v.008h.008v-.008zm0-4.5h-.008v.008h.008v-.008z" /></svg>,
  Expand: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  Screenshot: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>,
  Rotate360: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 13a1 1 0 100-2 1 1 0 000 2z" /></svg>,
  ChevronUp: () => <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>,
  ChevronDown: () => <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  ChevronLeft: () => <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  ChevronRight: () => <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
};

export function meta({}) {
  return [
    { title: "홈캠 상세" },
    { name: "description", content: "Device view" },
  ];
}

export default function Device() {
  const { id } = useParams();
  const navigate = useNavigate();
  const device = useMemo(() => dummyDevices.find((d) => d.id === id), [id]);

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white overflow-hidden font-sans">
      {/* ✅ 헤더 */}
      <header className="flex items-center justify-between px-4 py-3 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 rounded-full active:bg-gray-800 transition-colors"
        >
          <Icons.Back />
        </button>
        <h1 className="text-lg font-bold">{device?.name || "카메라 이름"}</h1>
        <button className="p-1 rounded-full active:bg-gray-800 transition-colors">
          <Icons.Settings />
        </button>
      </header>

      {/* ✅ 메인 영역 (스크롤 가능하거나 고정) */}
      <main className="flex flex-col flex-1 relative overflow-auto">
        
        {/* 🎥 비디오 스트림 영역 */}
        <div className="relative w-full aspect-video bg-black">
            {/* 더미 이미지 */}
          <img 
            src={device?.thumbnail || ""} 
            alt="Live Feed" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* 전체화면 버튼 오버레이 */}
          <div className="absolute bottom-4 right-4 text-white drop-shadow-md">
            <Icons.Expand />
          </div>
        </div>

        {/* 🎛 컨트롤 패널 영역 */}
        <div className="flex flex-col mb-12">
            
            {/* 탭 (재생 / 라이브) */}
            <div className="flex items-center justify-center gap-4 py-6 border-b border-gray-800/50 mx-6">
                <span className="text-gray-500 font-medium">재생</span>
                <div className="w-px h-4 bg-gray-600"></div>
                <span className="text-white font-bold">라이브</span>
            </div>

            {/* PTZ 조이스틱 및 퀵 액션 */}
            <div className="flex items-center justify-center relative min-h-[200px]">
                
                {/* 좌측: 스크린샷 버튼 */}
                <div className="absolute left-8 flex flex-col items-center gap-2 text-xs text-gray-400">
                    <button className="p-3 rounded-full bg-[#1E1E1E] hover:bg-[#2A2A2A] active:scale-95 transition">
                        <Icons.Screenshot />
                    </button>
                    <span>스크린샷</span>
                </div>

                {/* 중앙: PTZ 컨트롤러 */}
                <div className="w-56 h-56 rounded-full border border-[#2A2A2A] relative flex items-center justify-center">
                    {/* 내부 장식용 원 (선택사항) */}
                    <div className="w-40 h-40 rounded-full bg-[#161616]"></div>

                    {/* 방향키 - 위치 조정 */}
                    <button className="absolute top-4 left-1/2 -translate-x-1/2 p-2 text-blue-500 active:text-blue-400 active:-translate-y-1 transition">
                        <Icons.ChevronUp />
                    </button>
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-blue-500 active:text-blue-400 active:translate-y-1 transition">
                        <Icons.ChevronDown />
                    </button>
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-blue-500 active:text-blue-400 active:-translate-x-1 transition">
                        <Icons.ChevronLeft />
                    </button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-blue-500 active:text-blue-400 active:translate-x-1 transition">
                        <Icons.ChevronRight />
                    </button>
                </div>

                {/* 우측: 360 회전 버튼 */}
                <div className="absolute right-8 flex flex-col items-center gap-2 text-xs text-gray-400">
                    <button className="p-3 rounded-full bg-[#1E1E1E] hover:bg-[#2A2A2A] active:scale-95 transition">
                        <Icons.Rotate360 />
                    </button>
                    <span>360°회전</span>
                </div>
            </div>

        </div>

      </main>
      <div className="h-20 w-full"></div>
    </div>
  );
}
