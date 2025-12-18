// app/routes/m/device/$id/settings/info/storage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "저장소" },
    { name: "description", content: "Storage" },
  ];
}

export default function InfoStorage() {
  const navigate = useNavigate();
  // 초기값은 'auto'로 설정 (실제 데이터 연동 시 props나 loader 데이터 사용)
  const [selected, setSelected] = useState("auto");

  const options = [
    {
      id: "auto",
      label: "로컬",
      desc: "인식된 마이크로 SD카드 없음."
    },
    {
      id: "off",
      label: "클라우드",
      desc: "구독중인 클라우드 서비스가 없습니다."
    },
    {
      id: "on",
      label: "NAS",
      desc: "연결된 NAS가 없습니다."
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
          저장소
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