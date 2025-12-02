import moment from "moment";
import { useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { formatTime } from "~/lib/utils";

// ------------------------------------------------------------------
// 1. 설정 및 더미 데이터
// ------------------------------------------------------------------
// const DAY_START_STR = "2025-06-12T00:00:00";
// const DAY_END_STR = "2025-06-12T23:59:59";
// const BASE_TIMESTAMP = new Date(DAY_START_STR).getTime(); // 00:00:00을 타임라인 시작점(0px)으로 설정

// 요구사항 상수
const GAP_SCALE_SEC_PER_PX = 1200; // 빈 구간: 1픽셀당 1200초 (엄청 압축)
const MIN_EVENT_WIDTH_PX = 132;   // 이벤트 칩 최소 너비
const MAX_EVENT_WIDTH_PX = 240;   // 이벤트 칩 최대 너비

const dummyEvents = [
  {
    id: "evt_1",
    eventType: "motion",
    label: "움직임 감지",
    startTime: "2025-06-12T02:00:00",
    endTime: "2025-06-12T02:00:30",   // 30초 (짧은 이벤트)
    color: "bg-blue-600",
  },
  {
    id: "evt_2",
    eventType: "person",
    label: "사람 감지",
    startTime: "2025-06-12T08:30:00",
    endTime: "2025-06-12T08:35:00",   // 5분 (중간 이벤트)
    color: "bg-indigo-600",
  },
  {
    id: "evt_3",
    eventType: "fire",
    label: "화재 감지",
    startTime: "2025-06-12T15:35:00",
    endTime: "2025-06-12T16:35:00",   // 1시간 (아주 긴 이벤트 -> 375px 제한 걸림)
    color: "bg-red-600",
  },
  {
    id: "evt_4",
    eventType: "motion",
    label: "움직임 감지",
    startTime: "2025-06-12T18:10:00",
    endTime: "2025-06-12T18:10:45",
    color: "bg-blue-600",
  },
];

// ------------------------------------------------------------------
// 2. 타입 정의
// ------------------------------------------------------------------
type SegmentType = 'GAP' | 'EVENT';

interface TimeSegment {
  type: SegmentType;
  startTime: number;
  endTime: number;
  duration: number; // 초 단위

  // 렌더링용 계산 값
  startPx: number; // 이 세그먼트의 시작 픽셀 위치 (누적값)
  widthPx: number; // 이 세그먼트의 화면상 너비
  scalePxPerSec: number; // 이 세그먼트 내부의 1초당 픽셀 수
}

const Icons = {
  Back: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  Settings: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.72 1.076.72 1.66v2.16c0 .585-.225 1.23-.72 1.66m-8.91-1.44h.008v.008h-.008V12zm.008 2.25h-.008v.008h.008v-.008zm0-4.5h-.008v.008h.008v-.008z" /></svg>,
  Play: () => <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
  Pause: () => <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>,
  Rewind: () => <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M11 19V5l-9 7 9 7zm11 0V5l-9 7 9 7z" /></svg>,
  FastForward: () => <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M4 19V5l9 7-9 7zm11 0V5l9 7-9 7z" /></svg>,
  Motion: () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.2-2L14 10.8c.7-.6 1.7-1.3 1.8-2.6h2V6.5h-5c-1.2 0-2.2.7-2.6 1.6l-2 4.2-1.6-.9.6-2.5H5.1l-1 4.7 5.7 1.3z" /></svg>,
  Person: () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" stroke="currentColor" strokeWidth={1.5} fill="none" /></svg>,
  Fire: () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" /></svg>,
};


export default function AdaptiveTimeline({ videoStart, videoEnd, videoCurrentTime, videoDuration, onTimeUpdate, onPause, events }
  : {
    videoStart: string | undefined, //yyyy-MM-ddTHHmmss
    videoEnd: string | undefined,
    videoCurrentTime: number, // seconds
    videoDuration: number, // seconds
    onTimeUpdate: (time: number) => void,
    onPause: () => void,
    events: {
      id: string;
      eventType: string;
      label: string;
      startTime: string;
      endTime: string;
      color: string;
    }[] | undefined
  }
) {
  const GAP_SCALE_SEC_PER_PX = useMemo(() => videoDuration ? Math.round(videoDuration / 300) : 1, [videoDuration]);
  const DAY_END_STR = useMemo(() => videoEnd ? videoEnd : "", [videoEnd]);
  const BASE_TIMESTAMP = useMemo(() => videoStart ? new Date(videoStart).getTime() : 0, [videoStart]);
  const currentTime = BASE_TIMESTAMP + videoCurrentTime * 1000;

  // console.log('BASE_TIMESTAMP : ', new Date(BASE_TIMESTAMP).toISOString())
  // console.log('DAY_END_STR : ', DAY_END_STR)
  // console.log('currentTime : ', new Date(currentTime).toISOString())

  // 상태 관리 (초기값: 화재 발생 시점)
  // const [currentTime, setCurrentTime] = useState(new Date("2025-06-12T15:35:00").getTime());
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 드래그를 위한 Ref
  const timelineRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);

  // ==================================================================
  // ⭐️ 핵심 로직: 타임라인 세그먼트 계산 (Adaptive Scaling)
  // ==================================================================
  const { segments, totalWidthPx, processedEvents } = useMemo(() => {
    if (!events) return { segments: [], totalWidthPx: 0, processedEvents: [] };
    // 1. 이벤트들을 시간순 정렬 및 '블록'으로 병합 (겹치는 이벤트 처리)
    // 간단한 구현을 위해 겹치지 않는다고 가정하거나, 원본 이벤트를 기준으로 처리
    const sortedEvents = [...events].sort((a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    // 2. 전체 데이터셋에서 가장 짧은 duration 찾기 (min_duration)
    let minDuration = Number.MAX_SAFE_INTEGER;
    sortedEvents.forEach(evt => {
      const d = (new Date(evt.endTime).getTime() - new Date(evt.startTime).getTime()) / 1000;
      if (d < minDuration) minDuration = d;
    });
    // 방어코드: 이벤트가 하나도 없거나 너무 짧으면 10초로 가정
    if (minDuration === Number.MAX_SAFE_INTEGER || minDuration <= 0) minDuration = 10;

    // 3. 세그먼트 생성 (00:00:00 ~ 23:59:59 채우기)
    const resultSegments: TimeSegment[] = [];
    let currentPointer = BASE_TIMESTAMP;
    const dayEnd = new Date(DAY_END_STR).getTime();
    // 방어코드
    if (isNaN(dayEnd)) return { segments: [], totalWidthPx: 0, processedEvents: [] };

    // 기준 스케일 계산 (min_duration초 -> 125px)
    // Scale = 125 / minDuration (px/sec)
    const baseEventScale = MIN_EVENT_WIDTH_PX / minDuration;

    for (const evt of sortedEvents) {
      const evtStart = new Date(evt.startTime).getTime();
      const evtEnd = new Date(evt.endTime).getTime();

      // (A) 빈 구간 (Gap) 추가
      if (evtStart > currentPointer) {
        const gapDuration = (evtStart - currentPointer) / 1000;
        resultSegments.push({
          type: 'GAP',
          startTime: currentPointer,
          endTime: evtStart,
          duration: gapDuration,
          startPx: 0, // 나중에 계산
          widthPx: gapDuration / GAP_SCALE_SEC_PER_PX, // 400초당 1픽셀
          scalePxPerSec: 1 / GAP_SCALE_SEC_PER_PX
        });
      }

      // (B) 이벤트 구간 (Event) 추가
      const evtDuration = (evtEnd - evtStart) / 1000;

      // 요구사항: 기본 너비 계산
      let calculatedWidth = evtDuration * baseEventScale;

      // 요구사항: 너비 Clamp (최소 125px(이미 보장됨), 최대 375px)
      // minDuration일 때 이미 125px이므로 최소값은 체크 불필요하지만 안전하게
      calculatedWidth = Math.max(MIN_EVENT_WIDTH_PX, calculatedWidth);
      calculatedWidth = Math.min(MAX_EVENT_WIDTH_PX, calculatedWidth); // 최대 너비 제한

      resultSegments.push({
        type: 'EVENT',
        startTime: evtStart,
        endTime: evtEnd,
        duration: evtDuration,
        startPx: 0,
        widthPx: calculatedWidth,
        scalePxPerSec: calculatedWidth / evtDuration // 이 구간만의 스케일(압축률)
      });

      currentPointer = Math.max(currentPointer, evtEnd);
    }

    // (C) 마지막 남은 빈 구간 추가
    if (currentPointer < dayEnd) {
      const gapDuration = (dayEnd - currentPointer) / 1000;
      resultSegments.push({
        type: 'GAP',
        startTime: currentPointer,
        endTime: dayEnd,
        duration: gapDuration,
        startPx: 0,
        widthPx: gapDuration / GAP_SCALE_SEC_PER_PX,
        scalePxPerSec: 1 / GAP_SCALE_SEC_PER_PX
      });
    }

    // 4. 누적 좌표(startPx) 계산
    let accumPx = 0;
    resultSegments.forEach(seg => {
      seg.startPx = accumPx;
      accumPx += seg.widthPx;
    });

    // 5. 렌더링용 이벤트 데이터에 위치 정보 매핑
    const renderedEvents = sortedEvents.map(evt => {
      const start = new Date(evt.startTime).getTime();
      // 해당 시간이 포함된 세그먼트 찾기 (단순화: 이벤트 시작 시간은 무조건 EVENT 세그먼트 시작점과 일치함)
      const segment = resultSegments.find(s => s.type === 'EVENT' && s.startTime === start);

      let icon = <Icons.Motion />;
      if (evt.eventType === 'person') icon = <Icons.Person />;
      if (evt.eventType === 'fire') icon = <Icons.Fire />;

      return {
        ...evt,
        leftPx: segment ? segment.startPx : 0,
        widthPx: segment ? segment.widthPx : 0,
        icon
      };
    });

    return {
      segments: resultSegments,
      totalWidthPx: accumPx,
      processedEvents: renderedEvents
    };

  }, [videoStart, videoEnd, videoDuration, events]);


  // ==================================================================
  // ⭐️ 좌표 변환 함수 (Time <-> Pixel)
  // ==================================================================

  // 시간 -> 전체 타임라인에서의 픽셀 위치
  const getPxFromTime = (time: number) => {
    // 범위를 벗어난 경우 처리
    if (time < BASE_TIMESTAMP) return 0;

    // 이진 탐색 대신 간단한 find로 구현 (세그먼트 개수가 적으므로 성능 이슈 없음)
    const segment = segments.find(seg => time >= seg.startTime && time < seg.endTime);

    // 마지막 구간 이후인 경우
    if (!segment) {
      const last = segments[segments.length - 1];
      if (time >= last.endTime) return last.startPx + last.widthPx;
      return 0;
    }

    const offsetSec = (time - segment.startTime) / 1000;
    return segment.startPx + (offsetSec * segment.scalePxPerSec);
  };

  // 픽셀 위치 -> 시간
  const getTimeFromPx = (px: number) => {
    if (px <= 0) return BASE_TIMESTAMP;
    if (px >= totalWidthPx) return new Date(DAY_END_STR).getTime();

    const segment = segments.find(seg => px >= seg.startPx && px < seg.startPx + seg.widthPx);
    if (!segment) return BASE_TIMESTAMP;

    const offsetPx = px - segment.startPx;
    const offsetSec = offsetPx / segment.scalePxPerSec;
    return segment.startTime + (offsetSec * 1000);
  };


  // ==================================================================
  // 드래그 핸들러
  // ==================================================================
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    onPause();
    startXRef.current = e.clientX;

    // 현재 시간의 픽셀 위치 저장
    startTimeRef.current = getPxFromTime(currentTime);

    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startXRef.current;

    // 왼쪽으로 드래그(-)하면 미래로 가야 하므로 -> 픽셀 위치는 증가해야 함
    // 오른쪽으로 드래그(+)하면 과거로 가야 하므로 -> 픽셀 위치는 감소해야 함
    const targetPx = startTimeRef.current - deltaX;

    const newTime = getTimeFromPx(targetPx);

    onTimeUpdate((newTime - BASE_TIMESTAMP) / 1000);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  // 현재 시간 기준 타임라인 이동량 계산
  // 중앙(50vw)에 현재 시간이 오도록: -현재픽셀위치
  // const currentPxPosition = getPxFromTime(currentTime);
  // const translateX = -currentPxPosition;

  if (!events || !videoStart || !videoEnd) return (
    <div className="flex flex-col flex-1 bg-[#121212] mb-12 relative">
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono font-bold bg-blue-600 px-2 py-0.5 rounded text-white shadow-md">
        {formatTime(currentTime)}
      </div>
      {/* 타임라인 skeleton */}
      <div
        className="relative w-full h-20 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {/* 중앙 인디케이터 (고정) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white z-30 flex flex-col items-center justify-between -translate-x-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-neutral-300" />
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-8 border-b-neutral-300" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 bg-[#121212] mb-12 relative">

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono font-bold bg-blue-600 px-2 py-0.5 rounded text-white shadow-md">
        {formatTime(currentTime)}
      </div>
      {/* ⭐️ 인터랙티브 타임라인 */}
      <div
        // touch-action:pan-y (touch-pan-y) 없으면 상하 스크롤 이동이 막힘
        className="relative w-full h-20 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        ref={timelineRef}
      >
        {/* 중앙 인디케이터 (고정) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white z-30 flex flex-col items-center justify-between -translate-x-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-neutral-300" />
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-8 border-b-neutral-300" />
        </div>

        {/* 움직이는 타임라인 트랙 */}
        <div
          className="absolute top-0 h-full flex items-center will-change-transform"
          style={{
            // 50vw는 화면 중앙. 거기서 현재 시간의 픽셀만큼 왼쪽으로 당김
            // 중앙(50vw)에 현재 시간이 오도록: -현재픽셀위치
            transform: `translateX(calc(50vw + ${-getPxFromTime(currentTime)}px))`,
            transition: isDragging ? 'none' : 'transform 0.1s linear'
          }}
        >
          {/* 1. 눈금 (Gap 구간) 시각화 */}
          {/* 전체 길이에 대한 선 */}
          <div
            className="absolute top-1/2 left-0 h-px bg-gray-800 -translate-y-1/2"
            style={{ width: totalWidthPx }}
          />

          {/* 시간 눈금 (디버깅용, Gap 구간마다 점 찍기) */}
          {segments.map((seg, idx) => (
            <div
              key={`seg-${idx}`}
              className="absolute top-1/2 h-3 w-px bg-gray-700 -translate-y-1/2"
              style={{ left: seg.startPx }}
            />
          ))}

          {/* 2. 이벤트 칩 렌더링 */}
          {processedEvents.map((evt) => (
            <div
              key={evt.id}
              className={`absolute top-1/2 -translate-y-1/2 h-12 rounded-2xl flex flex-col items-center justify-center px-1 shadow-lg border border-white/10 z-10 ${evt.color}`}
              style={{
                left: `${evt.leftPx}px`,
                width: `${evt.widthPx}px`,
              }}
            >
              {/* 아이콘과 텍스트 */}
              <div className="flex items-center gap-1.5 mb-0.5">
                {evt.icon}
                <span className="text-xs font-bold text-white truncate max-w-[80%]">
                  {evt.label}
                </span>
              </div>
              {/* 칩 내부 시간 표시 (긴 칩에서 유용) */}
              <div className="text-[10px] text-white/80 font-mono">
                {formatTime(new Date(evt.startTime).getTime())} ~ {formatTime(new Date(evt.endTime).getTime())}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}