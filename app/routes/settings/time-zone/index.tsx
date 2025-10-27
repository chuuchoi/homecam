import type { Route } from "../../settings/time-zone/+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "설정 - 시간설정" },
    { name: "description", content: "setting time-zone" },
  ];
}

export default function TimeZone() {
  return(
    <div>
      <h1>시간설정</h1>
      <h2>시간표기 형식</h2>
      <h2>표준 시간대</h2>
    </div>
  )
}
