// app/routes/m/records/$id.tsx
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams, type LoaderFunctionArgs } from "react-router";
import moment from "moment";
import dummyDevices from "../dummyDevices.json";
import { BackIcon, DownloadIcon, FilterIcon, FireEventIcon, MotionEventIcon, PersonEventIcon } from "~/components/icons";
import { useQuery } from "@tanstack/react-query";
import { getData } from "~/lib/axios";
import type { ReplayEvent } from "~/api/device/$id/replay";
import type { HomeDevice } from "../home";

const Icons = {
  ChevronDown: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
};


// ✅ Loader: 홈캠 데이터 가져오기
export const loader = async ({ params }: LoaderFunctionArgs) => {
  // 실제로는 DB나 API에서 가져올 데이터
  const devices = dummyDevices
  const device = devices.find((device) => device.id === params.id);
  return { device } as { device: HomeDevice };
};


function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export default function Records({ params }: { params: { id: string } }) {
  const navigate = useNavigate();
  const { device } = useLoaderData<typeof loader>();
  const { id } = params;
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const { data } = useQuery({
    queryKey: ["replay", id, date],
    queryFn: () => getData(`/api/device/${id}/replay?date=${date}`),
  });

  const events = data?.events || [];

  // refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dayRefs = useRef<Array<HTMLDivElement | null>>([]);
  // initial done flag (ref so updating doesn't rerender)
  const initialDone = useRef(false);
  // state to control visibility after initial scroll is set
  const [visible, setVisible] = useState(false);

  const daysInMonth = useMemo(
    () => getDaysInMonth(moment(date).year(), moment(date).month() + 1),
    [date]
  );

  // 1) 마운트 시 (한 번만) — 즉시 scrollLeft 설정 (behavior: auto)
  useLayoutEffect(() => {
    const selectedDay = moment(date).date(); // 1~31
    const target = dayRefs.current[selectedDay - 1];
    const container = containerRef.current;

    if (target && container) {
      const containerWidth = container.clientWidth;
      const targetWidth = target.clientWidth;
      // offsetLeft은 container 내에서의 좌측 위치 (padding 포함)
      const targetLeft = target.offsetLeft;

      const scrollTo = targetLeft - containerWidth / 2 + targetWidth / 2;

      // 즉시 적용 (애니메이션 없이) — paint 전이라 플래시 최소화
      container.scrollLeft = scrollTo;
    }

    // 초기 처리가 끝났음을 표시해서 visible 상태로 바꾼다.
    // 다음 칸에서는 부드러운 스크롤 로직(날짜 변경 시)에 의해 애니메이션이 발생할 수 있음.
    initialDone.current = true;
    setVisible(true);
    // 빈 deps -> 마운트 시 1회만 실행
  }, []);
  // 2) date 변경 시(사용자 클릭 등) -> 부드럽게 스크롤
  useEffect(() => {
    if (!initialDone.current) return; // 초기 마운트 때는 이미 처리했으니 skip

    const selectedDay = moment(date).date();
    const target = dayRefs.current[selectedDay - 1];
    const container = containerRef.current;

    if (target && container) {
      const containerWidth = container.clientWidth;
      const targetWidth = target.clientWidth;
      const targetLeft = target.offsetLeft;
      const scrollTo = targetLeft - containerWidth / 2 + targetWidth / 2;

      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [date]);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative mb-2">
        <div
          className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          이벤트 기록
        </div>
      </header>

      <main className="flex flex-1 p-6 pt-2 flex-col overflow-auto">
        <div className="flex items-center gap-2 relative justify-between">
          <label
            htmlFor="date"
            onClick={() => {
              const dateInput = document.getElementById("date");
              if (dateInput instanceof HTMLInputElement) {
                dateInput.showPicker?.();
              }
            }}
            className="relative text-white text-sm font-medium ml-1 bg-transparent has-focus:bg-neutral-500/30 py-1.5 px-3 rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {moment(date).format("M월 YYYY년")}
              <Icons.ChevronDown />
            </div>
            <input
              id="date"
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              className="pointer-events-none absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>

          <div className="flex items-center gap-2">
            <FilterIcon />
            <DownloadIcon color="white" className="w-7 h-7" />
          </div>
        </div>

        {/* containerRef를 달고, 초기에는 visibility:hidden -> 중앙 스크롤 셋팅 후 visible */}
        <div
          id="day-scroll"
          ref={containerRef}
          className="relative w-full overflow-auto flex gap-3"
          style={{ visibility: visible ? "visible" : "hidden" }}
        >
          <div className="min-w-[calc(50%-32px)]" />

          {Array.from({ length: daysInMonth }).map((_, index) => {
            return (
              <div
                key={index}
                ref={(el) => {
                  dayRefs.current[index] = el;
                }}
                className={`h-10 min-w-10 rounded-full flex items-center justify-center shadow-lg z-10
                   ${moment(date).date() === index + 1 ? "text-blue-600 font-bold" : "text-white/50"}`}
                onClick={() =>
                  setDate(
                    `${moment(date).year()}-${String(moment(date).month() + 1).padStart(
                      2,
                      "0"
                    )}-${String(index + 1).padStart(2, "0")}`
                  )
                }
              >
                <span>{index + 1}</span>
              </div>
            );
          })}

          <div className="min-w-[calc(50%-32px)]" />
        </div>

        {/* 이벤트 목록 */}
        <div className="flex flex-col flex-1 gap-2 mt-5 overflow-auto">
          {events.map((event: ReplayEvent) => {
            let icon = <MotionEventIcon className="w-7 h-7" />;
            if (event.eventType === 'person') icon = <PersonEventIcon className="w-7 h-7" />;
            if (event.eventType === 'fire') icon = <FireEventIcon className="w-7 h-7" />;
            return (
              <div
                key={event.id}
                className="w-full flex  items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-[-webkit-fill-available] flex flex-col gap-2 items-center">
                    <div className="bg-blue-600 rounded-lg p-1">
                      {icon}
                    </div>
                    <div className="bg-white/50 flex-1 w-px" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>{moment(event.startTime).format("HH:mm:ss")}</span>
                    <span>{device.name}</span>
                    <span>{event.label}</span>
                  </div>
                </div>
                {/* 썸네일 이미지 */}
                <img
                  src={device.thumbnail}
                  alt={device.name}
                  className="w-2/5 aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            );
          })}
        </div>

      </main>

      <div className="h-16 w-full "></div>
    </div>
  );
}
