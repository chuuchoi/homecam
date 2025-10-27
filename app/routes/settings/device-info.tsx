import type { Route } from "../settings/+types/device-info";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "설정 - 기기정보" },
    { name: "description", content: "device info" },
  ];
}

export default function DeviceInfo() {
  return(
    <div>
      <h1>Device Info</h1>
      <h2>모델번호</h2>
      <h2>일련번호</h2>
      <h2>시스템 버전</h2>
      <h2>Wi-Fi</h2>
      <h2>저장소</h2>
      <h2>시간설정</h2>
      <h2>IP 주소</h2>
      <h2>MAC 주소</h2>
    </div>
  )
}
