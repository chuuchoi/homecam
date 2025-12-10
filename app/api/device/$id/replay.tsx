// app/api/device/$id/replay.tsx
import type { LoaderFunctionArgs } from "react-router";

let dummyReplayData: Record<string, any> = {};

export interface ReplayData {
  events: ReplayEvent[];
  video: {
    url: string;
    startTime: string;
    endTime?: string;
  };
}

export interface ReplayEvent {
  id: string;
  eventType: string;
  label: string;
  startTime: string;
  endTime: string;
  color: string;
}

// 이벤트 타입 3종
const EVENT_TYPES = [
  {
    eventType: "motion",
    label: "움직임 감지",
    color: "bg-blue-600",
  },
  {
    eventType: "person",
    label: "사람 감지",
    color: "bg-indigo-600",
  },
  {
    eventType: "fire",
    label: "화재 감지",
    color: "bg-red-600",
  },
];

// HH:mm:ss → 초로 변환
const toSeconds = (t: string) => {
  const [h, m, s] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

// 초 → HH:mm:ss
const toTimeString = (sec: number) => {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

// 랜덤 이벤트 생성(2~5개), 0~540초 사이에서 겹치지 않게
const dummyEvents = (date: string) => {
  const eventsCount = Math.floor(Math.random() * 6) + 2; // 2~7개
  const maxSeconds = 9 * 60; // 9분 = 540초

  const events: ReplayEvent[] = [];
  const usedRanges: { start: number; end: number }[] = [];

  let attempts = 0;

  while (events.length < eventsCount && attempts < 1000) {
    attempts++;

    // 랜덤 시작 시간(0~500초)
    const startSec = Math.floor(Math.random() * (maxSeconds - 40)); // 최소 10~40초 확보
    const duration = Math.floor(Math.random() * 20) + 10; // 10~30초 길이
    const endSec = startSec + duration;

    if (endSec > maxSeconds) continue; // 범위 초과 시 skip

    // 겹치는 구간 체크
    const isOverlap = usedRanges.some(
      (r) => !(endSec <= r.start || startSec >= r.end)
    );
    if (isOverlap) continue;

    // 사용 가능한 시간대면 등록
    usedRanges.push({ start: startSec, end: endSec });

    // 이벤트 타입 랜덤 선택
    const evt = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];

    events.push({
      id: `${date}_evt_${events.length + 1}`,
      eventType: evt.eventType,
      label: evt.label,
      color: evt.color,
      startTime: `${date}T${toTimeString(startSec)}`,
      endTime: `${date}T${toTimeString(endSec)}`,
    });
  }

  return events.sort(
    (a, b) =>
      toSeconds(a.startTime.split("T")[1]) -
      toSeconds(b.startTime.split("T")[1])
  );
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id } = params;
  const url = new URL(request.url);
  const date = url.searchParams.get("date")
  if (!date) {
    return new Response(JSON.stringify({ error: "date is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 메모리 데이터 없으면 기본 dummyEvents
  if (!dummyReplayData[`${id}_${date}`]) {
    dummyReplayData[`${id}_${date}`] = {
      events: dummyEvents(date),
      video: {
        url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
        startTime: `${date}T00:00:00`,
        // endTime: `${date}T00:01:00`,
      },
    };
  }

  return new Response(JSON.stringify(dummyReplayData[`${id}_${date}`]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
