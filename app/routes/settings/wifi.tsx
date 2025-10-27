import type { Route } from "../settings/+types/wifi";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "설정 - WiFi" },
    { name: "description", content: "setting wifi" },
  ];
}

export default function WiFi() {
  return(
    <div>
      <h1>Wi-Fi</h1>
      <h2>현재 연결된 Wi-Fi</h2>
      <h2>사용 가능한 네트워크</h2>
    </div>
  )
}
