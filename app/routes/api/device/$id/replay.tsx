// app/routes/api/device/$id/replay.tsx
import moment from "moment";
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

const dummyEvents = (date: string) => [
  {
    id: "evt_1",
    eventType: "motion",
    label: "움직임 감지",
    startTime: `${date}T00:00:10`,
    endTime: `${date}T00:00:20`,
    color: "bg-blue-600",
  },
  {
    id: "evt_2",
    eventType: "person",
    label: "사람 감지",
    startTime: `${date}T00:02:30`,
    endTime: `${date}T00:03:35`,
    color: "bg-indigo-600",
  },
  {
    id: "evt_3",
    eventType: "fire",
    label: "화재 감지",
    startTime: `${date}T00:05:00`,
    endTime: `${date}T00:05:30`,
    color: "bg-red-600",
  },
  {
    id: "evt_4",
    eventType: "motion",
    label: "움직임 감지",
    startTime: `${date}T00:08:00`,
    endTime: `${date}T00:08:45`,
    color: "bg-blue-600",
  },
];

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
