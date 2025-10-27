import type { Route } from "../../settings/time-zone/+types/format";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "설정 - 시간설정 - 시간표기 형식" },
    { name: "description", content: "setting time format" },
  ];
}

export default function TimeFormat() {
  return(
    <div>
      <h1>시간표기 형식</h1>
    </div>
  )
}
