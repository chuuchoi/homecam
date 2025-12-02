// app/routes/m/home.tsx
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { registerServiceWorker } from "~/utils/registerServiceWorker";
import dummyDevices from "./dummyDevices.json"

interface HomeDevice{
  id: string;
  name: string;
  thumbnail: string;
  status: "online" | "offline";
}

export function meta({}) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}

// ✅ Loader: 홈캠 데이터 가져오기
export const loader = async () => {
  // 실제로는 DB나 API에서 가져올 데이터
  const devices = dummyDevices
  return { devices } as {devices:HomeDevice[]};
};


export default function Home() {
  const navigate = useNavigate();
  const { devices } = useLoaderData<typeof loader>();

  const [isGridView, setIsGridView] = useState(false); // 뷰 모드 상태 (false: 1열 리스트, true: 2열 그리드)

  useEffect(()=>{
    const checkSubscription = async () => {
      // 저장된 구독 정보 가져오기 (혹은 서버에서 가져오기)
      const stored = localStorage.getItem("push-subscription");
      if (!stored) {
        await registerServiceWorker();
      } else {
        const sub = JSON.parse(stored);
        console.log(sub)
        // 필요 시 구독 만료 여부 확인 로직 추가 가능
      }
    };
    checkSubscription();
  },[])

  const testPush = async () => {
    // 저장된 구독 정보 가져오기 (혹은 서버에서 가져오기)
    const sub = localStorage.getItem("push-subscription");
    if (!sub) {
      alert("구독 정보가 없습니다. 먼저 알림 권한을 허용하세요.");
      return;
    }

    const subscription = JSON.parse(sub);

    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscription,
        title: "홈캠 알림 테스트 🎥",
        body: "이건 테스트 푸시 메시지입니다.",
      }),
    });

    const result = await res.json();
    console.log("Push result:", result);
  };



  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* ✅ 상단 헤더 */}
      <header className="flex items-center sticky top-0 bg-black justify-between px-4 py-3 border-b border-gray-800">
        <h1 className="text-lg font-semibold">오늘의 집</h1>
        <div className="flex items-center gap-4">
          <button aria-label="알림" className="text-gray-300 hover:text-white"
          onClick={()=>{testPush()}}
          >
            🔔
          </button>
          <button
            aria-label="추가"
            className="text-gray-300 hover:text-white"
            onClick={() => navigate("/m/add-device/scanqr")}
          >
            ＋
          </button>
        </div>
      </header>

      {devices.length > 0 ?
        <main className="flex flex-1 p-6 pt-2 flex-col items-end overflow-auto">
          {/* ✅ 뷰 모드 토글 (우측 상단) */}
          <div className="flex justify-end mb-2">
            <div className="flex bg-[#1E1E1E] rounded-lg p-1 gap-1">
              {/* 리스트 뷰 버튼 (1열) */}
              <button 
                onClick={() => setIsGridView(false)}
                className={`p-1.5 rounded ${!isGridView ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 13.5h16.5" />
                  <rect x="3.75" y="8.25" width="16.5" height="7.5" rx="1" strokeWidth={2}/>
                </svg>
              </button>
              {/* 그리드 뷰 버튼 (2열) */}
              <button 
                onClick={() => setIsGridView(true)}
                className={`p-1.5 rounded ${isGridView ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
            </div>
          </div>

          {/* ✅ 메인 콘텐츠: 리스트/그리드 */}
          <div className={`grid gap-4 ${isGridView ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {devices.map((device) => (
              <Link 
                to={`/m/device/${device.id}/live`}
                key={device.id} 
                className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gray-800 group cursor-pointer"
              >
                {/* 썸네일 이미지 */}
                <img 
                  src={device.thumbnail} 
                  alt={device.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* 상단 오버레이 (와이파이, 메뉴) */}
                <div className="absolute top-3 left-3 text-white drop-shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-1 text-white"
                onClick={(e)=>{e.stopPropagation();console.log('메뉴클릭')}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>

                {/* 하단 텍스트 (그라데이션 배경) */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-4 pt-10">
                  <span className="text-white font-bold text-lg">{device.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
        :
        <main className="flex flex-1 items-center justify-center">
          <button
            className="bg-blue-600 px-5 py-2 rounded-full text-white font-medium active:scale-95 transition-transform"
            onClick={() => {console.log('??');navigate("/m/add-device/scanqr")}}
          >
            장치 추가
          </button>
        </main>
      }

      <div className="h-16 w-full "></div>
    </div>
  );
}
