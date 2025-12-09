// app/routes/m/device/$id/settings/name.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "카메라명 설정" },
    { name: "description", content: "Camera Name Settings" },
  ];
}

// 아이콘 컴포넌트
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="2 6 4.5 9 10 2.5"></polyline>
    </svg>
  );
}

export default function CameraNameSettings() {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState("거실");

  const predefinedNames = ["입구", "거실", "주방", "침실"];

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen">
      <header className="w-full px-4 py-4 flex items-center gap-1 mb-4 sticky top-0 z-10 bg-[#121212]">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-[17px] flex items-center justify-center w-full gap-1">
          카메라명
        </div>
      </header>

      <main className="px-4">
        <h2 className="text-[#a0a0a0] text-[13px] font-medium mb-2 px-1">
          카메라 이름 지정
        </h2>

        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden divide-y divide-[#333333]">
          {/* 미리 정의된 이름 목록 */}
          {predefinedNames.map((name) => (
            <div
              key={name}
              className="flex items-center justify-between p-4 cursor-pointer active:bg-[#2c2c2e] transition-colors"
              onClick={() => setSelectedName(name)}
            >
              <span className="text-[16px] font-medium">{name}</span>

              {/* 커스텀 체크박스 */}
              <div className={`w-[22px] h-[22px] rounded-[5px] flex items-center justify-center transition-colors ${selectedName === name
                ? "bg-[#007AFF] border-transparent"
                : "bg-transparent border border-[#555]"
                }`}>
                {selectedName === name && <CheckIcon className="text-white" />}
              </div>
            </div>
          ))}

          {/* 직접 입력 메뉴 */}
          <div
            className="flex items-center justify-between p-4 cursor-pointer active:bg-[#2c2c2e] transition-colors"
            onClick={() => {
              // 직접 입력 페이지로 이동하거나 모달 띄우기
              console.log("직접 입력 클릭");
            }}
          >
            <span className="text-[16px] font-medium">직접입력</span>
            <ChevronRightIcon className="w-5 h-5 text-[#666]" />
          </div>
        </div>
      </main>
    </div>
  );
}