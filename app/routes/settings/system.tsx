import type { Route } from "../settings/+types/system";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "설정 - 시스템 버전" },
    { name: "description", content: "system version" },
  ];
}

export default function System() {
  return(
    <div>
      <h1>System</h1>
      <h2>자동 업데이트</h2>
    </div>
  )
}
