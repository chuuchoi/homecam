// app/routes/m/device/$id/settings/info.tsx
import { useNavigate, useParams } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "기기 정보" },
    { name: "description", content: "Device Information" },
  ];
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

export default function DeviceInfo() {
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
          기기정보
        </div>
      </header>

      <main className="px-4 flex flex-col gap-4">

        {/* 그룹 1: 기본 정보 */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden divide-y divide-[#333333]">
          <InfoRow label="모델번호" value="Anna home Cam" />
          <InfoRow label="일련번호" value="T8410P4224211630" />
          <InfoRow label="시스템 버전" value="2.3.1.6" hasArrow link={`/m/device/${id}/settings/info/version`} />
        </div>

        {/* 그룹 2: Wi-Fi */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
          <InfoRow label="Wi-Fi" value="ANNA_2.4G" hasArrow link={`/m/device/${id}/settings/info/wifi`} />
        </div>

        {/* 그룹 3: 저장소 */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
          <InfoRow label="저장소" value="로컬 저장소" hasArrow link={`/m/device/${id}/settings/info/storage`} />
        </div>

        {/* 그룹 4: 시간설정 */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
          <InfoRow label="시간설정" value="GMT+9(서울)" hasArrow link={`/m/device/${id}/settings/info/time`} />
        </div>

        {/* 그룹 5: 네트워크 정보 (읽기 전용) */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden divide-y divide-[#333333]">
          <InfoRow label="IP 주소" value="192.168.0.77" />
          <InfoRow label="MAC 주소" value="102CB17B38FA" />
        </div>

        {/* 그룹 6: 기기 삭제 */}
        <div className="bg-[#1C1C1E] rounded-xl overflow-hidden mt-2">
          <button
            className="w-full p-4 text-[#FF453A] text-[16px] font-medium active:bg-[#2c2c2e] transition-colors"
            onClick={() => alert("기기를 삭제하시겠습니까?")}
          >
            기기삭제
          </button>
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
  link?: string;
}

function InfoRow({ label, value, hasArrow = false, link }: InfoRowProps) {
  const navigate = useNavigate();
  return (
    <div className={`flex items-center justify-between p-4 ${hasArrow ? 'cursor-pointer active:bg-[#2c2c2e] transition-colors' : ''}`}
      onClick={() => { if (link) navigate(link) }}>
      <span className="text-[15px] text-[#e5e5e5]">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-[#8E8E93] text-[15px]">{value}</span>
        {hasArrow && <ChevronRightIcon className="text-[#666]" />}
      </div>
    </div>
  );
}