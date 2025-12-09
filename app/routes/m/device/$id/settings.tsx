// app/routes/m/device/$id/settings.tsx
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "홈캠 디바이스 설정" },
    { name: "description", content: "Homecam device settings" },
  ];
}

// --- 아이콘 컴포넌트 (ChevronRight, Check) ---
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

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

export default function DeviceSettings() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 상태 관리 (예시)
  const [events, setEvents] = useState({
    person: true,
    motion: true,
    fire: true,
    fall: true,
  });
  const [audioRecording, setAudioRecording] = useState(true);
  const [volume, setVolume] = useState(50);

  const toggleEvent = (key: keyof typeof events) => {
    setEvents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pb-10">
      <header className="w-full px-4 py-4 flex items-center gap-1 mb-4 sticky top-0 z-10 bg-[#121212]">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-[17px] flex items-center justify-center w-full gap-1">
          설정
        </div>
      </header>

      <main className="px-4 flex flex-col gap-6">

        {/* 섹션 1: 감지이벤트 설정 */}
        <section>
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-[#a0a0a0] text-[13px] font-medium">감지이벤트 설정</h2>
            <button className="text-[#007AFF]">
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-[#1C1C1E] rounded-xl overflow-hidden divide-y divide-[#333333]">
            {[
              { label: "사람", key: "person" as const },
              { label: "움직임", key: "motion" as const },
              { label: "화재", key: "fire" as const },
              { label: "쓰러짐", key: "fall" as const },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 cursor-pointer active:bg-[#2c2c2e] transition-colors"
                onClick={() => toggleEvent(item.key)}
              >
                <span className="text-[16px]">{item.label}</span>
                {/* 커스텀 체크박스 UI */}
                <div className={`w-[22px] h-[22px] rounded-[5px] flex items-center justify-center transition-colors ${events[item.key] ? "bg-[#007AFF] border-transparent" : "bg-transparent border border-[#555]"
                  }`}>
                  {events[item.key] && <CheckIcon className="text-white" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 2: 감지 영역 설정 */}
        <section>
          <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 cursor-pointer active:bg-[#2c2c2e] transition-colors">
              <span className="text-[16px]">감지 영역 설정</span>
              <ChevronRightIcon className="w-5 h-5 text-[#666]" />
            </div>
          </div>
        </section>

        {/* 섹션 3: 카메라 설정 */}
        <section>
          <h2 className="text-[#a0a0a0] text-[13px] font-medium mb-2 px-1">카메라 설정</h2>
          <div className="bg-[#1C1C1E] rounded-xl overflow-hidden divide-y divide-[#333333]">
            <MenuRow label="카메라명" value="거실" to={`/m/device/${id}/settings/name`} />
            <MenuRow label="나이트 비전" value="자동" to={`/m/device/${id}/settings/nightvision`} />
            <MenuRow label="스트리밍 해상도" value="자동" to={`/m/device/${id}/settings/streaming`} />
            <MenuRow label="녹화품질" value="1080p" to={`/m/device/${id}/settings/recording`} />
          </div>
        </section>

        {/* 섹션 4: 오디오 설정 */}
        <section>
          <h2 className="text-[#a0a0a0] text-[13px] font-medium mb-2 px-1">오디오 설정</h2>
          <div className="bg-[#1C1C1E] rounded-xl overflow-hidden divide-y divide-[#333333]">
            {/* 오디오 녹음 스위치 */}
            <div className="flex items-center justify-between p-4">
              <span className="text-[16px]">오디오 녹음</span>
              <Switch
                checked={audioRecording}
                onChange={setAudioRecording}
                className={`${audioRecording ? 'bg-[#007AFF]' : 'bg-[#39393D]'
                  } relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${audioRecording ? 'translate-x-[20px]' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>

            {/* 스피커 사운드 슬라이더 */}
            <div className="flex flex-col gap-3 p-4 pt-3">
              <span className="text-[16px]">스피커 사운드</span>
              <div className="relative w-[calc(100%-20px)] m-auto h-10 flex items-center">
                {/* 슬라이더 트랙 배경 */}
                <div className="absolute w-full h-1.5 bg-[#3A3A3C] rounded-full overflow-hidden">
                  {/* 진행률 표시 (파란색) */}
                  <div
                    className="h-full bg-[#007AFF]"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                {/* 실제 input (투명하게 위에 덮어씌움) */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* 커스텀 썸(Thumb) - 슬라이더 핸들 */}
                <div
                  className="absolute h-5 w-5 bg-white rounded-full shadow-md pointer-events-none transition-transform"
                  style={{ left: `calc(${volume}% - 10px)` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 5: 기기정보 */}
        <section>
          <h2 className="text-[#a0a0a0] text-[13px] font-medium mb-2 px-1">기기정보</h2>
          <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
            <MenuRow label="기기정보" to={`/m/device/${id}/settings/info`} />
          </div>
        </section>

      </main>
    </div>
  );
}

// 재사용 가능한 메뉴 행 컴포넌트
function MenuRow({ label, value, to }: { label: string, value?: string, to?: string }) {
  return (
    <Link to={to || ""} className="flex items-center justify-between p-4 cursor-pointer active:bg-[#2c2c2e] transition-colors">
      <span className="text-[16px]">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-[#8E8E93] text-[15px]">{value}</span>}
        <ChevronRightIcon className="w-5 h-5 text-[#666]" />
      </div>
    </Link>
  );
}