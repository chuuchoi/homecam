// app/routes/m/records/index.tsx
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { registerServiceWorker } from "~/utils/registerServiceWorker";
import dummyDevices from "../dummyDevices.json"

export interface HomeDevice {
  id: string;
  name: string;
  thumbnail: string;
  status: "online" | "offline";
}

export function meta({ }) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}

// ✅ Loader: 홈캠 데이터 가져오기
export const loader = async () => {
  // 실제로는 DB나 API에서 가져올 데이터
  const devices = dummyDevices
  return { devices } as { devices: HomeDevice[] };
};


export default function Records() {
  const navigate = useNavigate();
  const { devices } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* ✅ 상단 헤더 */}
      <header className="flex items-center sticky top-0 bg-black justify-between px-4 py-3 border-b border-gray-800">
        <h1 className="text-lg font-semibold">기록</h1>
      </header>

      <main className="flex flex-1 p-6 pt-2 flex-col items-end overflow-auto">

        {/* ✅ 메인 콘텐츠: 리스트/그리드 */}
        <div className={`grid gap-4 'grid-cols-1'`}>
          {devices.map((device) => (
            <Link
              to={`/m/records/${device.id}`}
              key={device.id}
              className="relative w-full rounded-2xl overflow-hidden bg-gray-800 group cursor-pointer"
            >
              {/* 썸네일 이미지 */}
              <img
                src={device.thumbnail}
                alt={device.name}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* 하단 텍스트 (그라데이션 배경) */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4 pt-10 pb-2">
                <span className="text-white font-bold text-lg">{device.name} 이벤트 기록 보기</span>
              </div>
            </Link>
          ))}
        </div>
      </main>


      <div className="h-16 w-full "></div>
    </div>
  );
}
