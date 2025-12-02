// app/routes/api/device/filter.tsx
import type { ActionFunctionArgs } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

// DB 없이 임시 메모리 데이터
let deviceFilters: Record<string, { name: string; val: boolean }[]> = {};

// GET 요청 처리
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";

  // 없으면 기본 필터 반환
  if (!deviceFilters[id]) {
    deviceFilters[id] = [
      { name: "사람", val: true },
      { name: "화재", val: true },
      { name: "움직임", val: true },
      { name: "쓰러짐", val: true },
    ];
  }
  return new Response(JSON.stringify(deviceFilters[id]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// POST 요청 처리
export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.json();
  const { id, filters } = body as { id: string; filters: { name: string; val: boolean }[] };

  if (!id || !filters) {
    return new Response(JSON.stringify({ error: "id or filters missing" }), { status: 400 });
  }

  deviceFilters[id] = filters;

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
