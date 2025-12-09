// app/routes/m/device/$id/settings/streaming.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "스트리밍 해상도 설정" },
    { name: "description", content: "Streaming Resolution Settings" },
  ];
}

export default function StreamingSettings() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("auto");

  const options = [
    { id: "auto", label: "자동" },
    { id: "2k", label: "초고화질(2K)" },
    { id: "1080p", label: "고화질(1080p)" },
    { id: "720p", label: "일반(720p)" },
  ];

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen">
      <header className="w-full px-4 py-4 flex items-center gap-1 mb-4 sticky top-0 z-10 bg-[#121212]">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-[17px] flex items-center justify-center w-full gap-1">
          스트리밍 해상도
        </div>
      </header>

      <main className="px-6 flex flex-col gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setSelected(option.id)}
          >
            {/* 라디오 버튼 */}
            <div className={`w-5 h-5 rounded-full border border-[#007AFF] shrink-0 transition-colors ${selected === option.id ? "bg-[#007AFF]" : "bg-transparent"
              }`} />

            <span className="text-[16px] leading-none text-[#e5e5e5]">
              {option.label}
            </span>
          </div>
        ))}
      </main>
    </div>
  );
}