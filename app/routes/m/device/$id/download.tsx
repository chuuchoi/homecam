// app/routes/m/device/$id/download.tsx
import { Radio, RadioGroup } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { Form, useNavigate, useSearchParams } from "react-router";
import { BackIcon } from "~/components/icons";

export function meta({ }) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}

export default function ReplayDownload() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const currentEvent = useMemo(() => {
    try {
      return JSON.parse(searchParams.get("currentEvent") ?? "null")
    } catch (error) {
      return null
    }
  }, [searchParams])
  const videoStart = useMemo(() => searchParams.get("videoStart"), [searchParams])
  const videoEnd = useMemo(() => searchParams.get("videoEnd"), [searchParams])

  const menuItems = [
    { id: 1, label: "재생중 이벤트 영상 다운로드" },
    { id: 2, label: "재생중 일자 전체 다운로드" },
    { id: 3, label: "기간설정" },
  ];
  const [selected, setSelected] = useState<typeof menuItems[0] | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const Downloadable = useMemo(() => {
    if (selected?.id === 1) {
      return !!currentEvent
    }
    if (selected?.id === 3) {
      return !!startTime && !!endTime;
    }
    return !!selected;
  }, [selected, startTime, endTime]);
  useEffect(() => {
    if (selected?.id === 1) {
      setStartTime(currentEvent?.startTime ?? null)
      setEndTime(currentEvent?.endTime ?? null)
    }
    if (selected?.id === 2) {
      setStartTime(videoStart)
      setEndTime(videoEnd)
    }
  }, [selected])

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pt-6">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative mb-2">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          다운로드
        </div>
      </header>

      <main className="px-6 py-4">
        <div className="flex flex-col gap-6">
          <RadioGroup by="id" value={selected} onChange={setSelected} className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Radio
                key={item.id}
                value={item}
                className="w-full flex items-center gap-3 text-left group data-checked:opacity-70 transition-opacity"
              >
                {/* 파란색 원형 아이콘 (라디오 버튼 스타일) */}
                <div className="w-5 h-5 rounded-full border border-[#007AFF] shrink-0 group-data-checked:bg-[#007AFF]" />

                {/* 텍스트 */}
                <span className="text-[#e5e5e5] text-[15px] font-normal">
                  {item.label}
                </span>
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <Form onSubmit={(e) => { e.preventDefault(); alert(`download API need\nstartTime: ${startTime}\nendTime: ${endTime}`); }}>
          {selected?.id === 3 && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#a0a0a0] text-[13px] font-medium ml-1">시작 일시</label>
                <input
                  required
                  type="datetime-local"
                  max={endTime ?? undefined}
                  className="w-full bg-[#1e1e1e] text-white border border-[#333333] rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#007AFF] focus:bg-[#252525] transition-colors scheme-dark"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#a0a0a0] text-[13px] font-medium ml-1">종료 일시</label>
                <input
                  required
                  type="datetime-local"
                  min={startTime ?? undefined}
                  className="appearence-none w-full bg-[#1e1e1e] text-white border border-[#333333] rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#007AFF] focus:bg-[#252525] transition-colors scheme-dark"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          )}
          {selected?.id === 1 && !Downloadable && (
            <p className="text-[#a0a0a0] text-[13px] font-medium ml-1">재생중인 이벤트가 없습니다.</p>
          )}
          {Downloadable && (
            <>
              {(selected?.id !== 3) && (<>
                <p className="text-[#a0a0a0] text-[13px] font-medium ml-1">시작 일시: {startTime}</p>
                <p className="text-[#a0a0a0] text-[13px] font-medium ml-1">종료 일시: {endTime}</p>
              </>
              )}
              <button type="submit" className="w-full py-2.5 bg-[#007AFF] text-white text-center">다운로드</button>
            </>
          )}
        </Form>
      </main>

    </div>
  );
}