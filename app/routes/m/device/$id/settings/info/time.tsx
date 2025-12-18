// app/routes/m/device/$id/settings/info/time.tsx
import { useNavigate, useParams } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "시간설정" },
    { name: "description", content: "Time Setting" },
  ];
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

export default function TimeSetting() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pb-10">
      <header className="w-full px-4 py-4 flex items-center gap-1 mb-4 sticky top-0 z-10 bg-[#121212]">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-[17px] flex items-center justify-center w-full gap-1">
          시간설정
        </div>
      </header>

      <main className="px-4 flex flex-col gap-4">

        {/* 시간 표기 형식 */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
          <InfoRow label="시간 표기 형식" value="12시간제" hasArrow />
        </div>

        {/* 표준 시간대 */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
          <InfoRow label="표준 시간대" value="GMT+9(서울)" hasArrow />
        </div>

      </main>
    </div>
  );
}

// 재사용 가능한 정보 행 컴포넌트
interface InfoRowProps {
  label: string;
  value: string;
  hasArrow?: boolean;
}

function InfoRow({ label, value, hasArrow = false }: InfoRowProps) {
  return (
    <div className={`flex items-center justify-between p-4 ${hasArrow ? 'cursor-pointer active:bg-[#2c2c2e] transition-colors' : ''}`}>
      <span className="text-[15px] text-[#e5e5e5]">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-[#8E8E93] text-[15px]">{value}</span>
        {hasArrow && <ChevronRightIcon className="text-[#666]" />}
      </div>
    </div>
  );
}