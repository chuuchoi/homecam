import type { Route } from "../../settings/time-zone/+types/timezone";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "설정 - 시간설정 - 표준 시간대" },
    { name: "description", content: "setting standard time-zone" },
  ];
}

export default function StandardTimeZone() {
  return(
    <div>
      <h1>표준 시간대</h1>
    </div>
  )
}
