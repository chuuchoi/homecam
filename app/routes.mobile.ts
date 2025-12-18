// app/routes.mobile.ts
import { index, layout, prefix, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // 👇 User-Agent 기반 redirect 먼저
  // layout("redirect_mobile.tsx",[
  ...prefix("m", [

    // 👇 인증 안 된 사용자만 진입가능
    layout("layout/m/auth-anon-only.tsx", [
      index("routes/m/login.tsx"),
      route("sign-up", "routes/m/sign-up.tsx"),
      route("test-Passkey", "routes/m/test-Passkey.tsx"),
    ]),
    // 👇 인증된 사용자만 진입가능
    layout("./layout/m/auth-required.tsx", [
      ...prefix("device", [
        route(":id/replay", "routes/m/device/$id/replay.tsx"),
        route(":id/live", "routes/m/device/$id/live.tsx"),
        route(":id/download", "routes/m/device/$id/download.tsx"),
        route(":id/calendar", "routes/m/device/$id/calendar.tsx"),
        route(":id/filter", "routes/m/device/$id/filter.tsx"),
        route(":id/settings", "routes/m/device/$id/settings.tsx"),
        ...prefix(":id/settings", [
          route("name", "routes/m/device/$id/settings/name.tsx"),
          route("nightvision", "routes/m/device/$id/settings/nightvision.tsx"),
          route("streaming", "routes/m/device/$id/settings/streaming.tsx"),
          route("recording", "routes/m/device/$id/settings/recording.tsx"),
          route("info", "routes/m/device/$id/settings/info.tsx"),
          ...prefix("info", [
            route("storage", "routes/m/device/$id/settings/info/storage.tsx"),
            route("time", "routes/m/device/$id/settings/info/time.tsx"),
            route("version", "routes/m/device/$id/settings/info/version.tsx"),
            route("wifi", "routes/m/device/$id/settings/info/wifi.tsx"),
          ]),
        ]),
      ]),
      ...prefix("add-device", [
        route("scanqr", "routes/m/add-device/scanqr.tsx"),
        route("select-home", "routes/m/add-device/select-home.tsx"),
        route("turn-on-device", "routes/m/add-device/turn-on-device.tsx"),
        route("connect-wifi", "routes/m/add-device/connect-wifi.tsx"),
        route("name", "routes/m/add-device/name.tsx"),
        route("notification", "routes/m/add-device/notification.tsx"),
      ]),
      route("devices", "routes/m/devices.tsx"),
      layout("./layout/m/bottom-tabs.tsx", [
        route("home", "routes/m/home.tsx"),
        route("records", "routes/m/records/index.tsx"),
        route("records/:id", "routes/m/records/$id.tsx"),
        route("store", "routes/m/store/index.tsx"),
      ]),

    ]),
    // route("*", "routes/m/index.tsx"),

    // ])

  ]),
] satisfies RouteConfig;
