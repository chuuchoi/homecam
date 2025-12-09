// app/routes/m/store/index.tsx
import { useNavigate } from "react-router";
import dummyDevices from "../dummyDevices.json"

// --- SVG 아이콘 컴포넌트들 ---
const CloudNetworkIcon = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full text-white opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
    {/* 중앙 구름 */}
    <path d="M100 40 C 80 40, 70 55, 70 65 C 50 65, 50 90, 70 90 L 130 90 C 150 90, 150 65, 130 65 C 130 50, 115 40, 100 40" fill="white" stroke="none" />
    <path d="M92 75 Q100 65 108 75 M96 68 Q100 60 104 68 M98 62 Q100 58 102 62" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

    {/* 연결선 및 노드 (장식용) */}
    <circle cx="40" cy="30" r="8" stroke="white" strokeWidth="1.5" />
    <path d="M46 34 L 75 60" stroke="white" strokeWidth="1" opacity="0.7" />
    <circle cx="160" cy="30" r="8" stroke="white" strokeWidth="1.5" />
    <path d="M154 34 L 125 60" stroke="white" strokeWidth="1" opacity="0.7" />
    <circle cx="30" cy="80" r="8" stroke="white" strokeWidth="1.5" />
    <path d="M38 80 L 70 80" stroke="white" strokeWidth="1" opacity="0.7" />
    <circle cx="170" cy="80" r="8" stroke="white" strokeWidth="1.5" />
    <path d="M162 80 L 130 80" stroke="white" strokeWidth="1" opacity="0.7" />

    {/* 아이콘 심볼들 */}
    <path d="M38 28 L42 28 M40 26 L40 34" stroke="white" strokeWidth="1.5" /> {/* + */}
    <rect x="156" y="26" width="8" height="8" stroke="white" strokeWidth="1.5" /> {/* Box */}
  </svg>
);

const FireIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
    <path d="M8.5 14.5A2.5 2.5 0 0011 17c1.38 0 2.5-1.12 2.5-2.5 0-1.38-.5-2-1.5-3-.35-.35-1-1-1-2 0 1.25.5 2 1.5 3 1 .98 1.5 1.76 1.5 3.01A4.01 4.01 0 0110 19.5a4 4 0 01-4-4c0-1.25.76-2.26 1.74-3.03.46-.36.76-.92.76-1.5 0-.54-.26-1.03-.66-1.35-.39-.32-1-.32-1.37.03C5.07 10.99 4 12.63 4 14.5c0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5c0-2.31-1.42-4.31-3.5-5.15C13.26 6.64 15 4.58 15 2c-3 1-5 3-5 5.5 0 .28.03.55.08.81-.88.7-1.5 1.76-1.5 2.94 0 .91.36 1.73.92 2.34.34.36.85.59 1.42.59z" />
  </svg>
);

const FallIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="14" cy="5" r="2" fill="white" stroke="none" />
    <path d="M12 9 L 16 9 L 18 14" />
    <path d="M12 9 L 9 12 L 6 11" />
    <path d="M12 9 L 11 15 L 14 19" />
    <path d="M11 15 L 7 17" />
  </svg>
);

const BabyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M12 13c-2.5 0-4.5 1.5-5 3.5h10c-.5-2-2.5-3.5-5-3.5z" />
  </svg>
);

const CartPlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    <path d="M12 10h4"></path> {/* Plus sign horizontal */}
    <path d="M14 8v4"></path>   {/* Plus sign vertical */}
  </svg>
);

export interface HomeDevice {
  id: string;
  name: string;
  thumbnail: string;
  status: "online" | "offline";
}

export function meta({ }) {
  return [
    { title: "홈캠 스토어" },
    { name: "description", content: "Homecam store" },
  ];
}

export const loader = async () => {
  const devices = dummyDevices
  return { devices } as { devices: HomeDevice[] };
};

export default function Store() {
  const navigate = useNavigate();

  const aiItems = [
    { id: 1, title: "화재", creator: "OOO", icon: <FireIcon /> },
    { id: 2, title: "쓰러짐", creator: "OOO", icon: <FallIcon /> },
    { id: 3, title: "아기 잠깸 감지", creator: "OOO", icon: <BabyIcon /> },
  ];

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen">
      {/* ✅ 상단 헤더 */}
      <header className="flex items-center sticky top-0 bg-black justify-between px-4 py-3 border-b border-gray-800">
        <h1 className="text-lg font-semibold">스토어</h1>
      </header>

      <main className="px-6 py-2 flex flex-col gap-8 pb-6">

        {/* 클라우드 서비스 섹션 */}
        <section>
          <div className="mb-3">
            <h2 className="text-[17px] font-medium text-[#e5e5e5]">클라우드 서비스</h2>
            <p className="text-[13px] text-[#8e8e93] mt-0.5">용량 걱정 없이 영상을 저장하세요.</p>
          </div>

          <div className="w-full aspect-[1.8/1] bg-[#4FA1E7] rounded-xl flex items-center justify-center overflow-hidden shadow-lg relative p-4">
            {/* 배경 그라데이션 및 SVG */}
            <div className="absolute inset-0 bg-linear-to-b from-[#60b0f4] to-[#4FA1E7]"></div>
            <div className="relative w-3/4 h-3/4">
              <CloudNetworkIcon />
            </div>
          </div>
        </section>

        {/* AI 감지 섹션 */}
        <section>
          <div className="mb-3 flex items-center gap-1 cursor-pointer">
            <h2 className="text-[17px] font-medium text-[#e5e5e5]">AI 감지</h2>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <p className="text-[13px] text-[#8e8e93] -mt-2 mb-4">더 많은 이벤트 감지로 더 안전하게</p>

          <div className="flex flex-col gap-4">
            {aiItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* 아이콘 박스 */}
                  <div className="w-[52px] h-[52px] bg-[#007AFF] rounded-xl flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>

                  {/* 텍스트 정보 */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[16px] font-medium text-[#e5e5e5]">{item.title}</span>
                    <span className="text-[13px] text-[#8e8e93]">제작자 : {item.creator}</span>
                  </div>
                </div>

                {/* 장바구니 버튼 */}
                <button className="p-2 active:opacity-70 transition-opacity">
                  <CartPlusIcon />
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
      <div className="h-16 w-full "></div>
    </div>
  );
}