// app/routes/m/device/$id/settings/nightvision.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "나이트 비전 설정" },
    { name: "description", content: "Night Vision Settings" },
  ];
}

export default function NightVisionSettings() {
  const navigate = useNavigate();
  // 초기값은 'auto'로 설정 (실제 데이터 연동 시 props나 loader 데이터 사용)
  const [selected, setSelected] = useState("auto");

  const options = [
    {
      id: "auto",
      label: "자동",
      desc: "빛의 따라 적외선을 자동으로 켜거나 끕니다."
    },
    {
      id: "off",
      label: "끄기",
      desc: "적외선 모드 촬영을 끕니다."
    },
    {
      id: "on",
      label: "켜기",
      desc: "항상 적외선 모드로 촬영합니다."
    },
  ];

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen">
      <header className="w-full px-4 py-4 flex items-center gap-1 mb-4 sticky top-0 z-10 bg-[#121212]">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-[17px] flex items-center justify-center w-full gap-1">
          나이트 비전
        </div>
      </header>

      <main className="px-6 flex flex-col gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => setSelected(option.id)}
          >
            {/* 라디오 버튼 아이콘 */}
            <div className={`mt-0.5 w-5 h-5 rounded-full border border-[#007AFF] shrink-0 flex items-center justify-center transition-colors ${selected === option.id ? "bg-[#007AFF]" : "bg-transparent"
              }`}>
              {/* 선택되었을 때 내부 점 (필요 시 추가, 현재는 전체 색칠 스타일) */}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] leading-none">{option.label}</span>
              <span className="text-[#555555] text-[13px] leading-snug">
                {option.desc}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}