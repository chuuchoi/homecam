// app/routes.ts
import { index, layout, prefix, route, type RouteConfig } from "@react-router/dev/routes";
import MobileRoutes from "./routes.mobile"

export default [
  route("api/logout", "routes/api/logout.tsx"),
  route("api/check-email", "routes/api/check-email.tsx"),
  route("api/find-pw", "routes/api/find-pw.tsx"),
  route("api/send-code", "routes/api/send-code.tsx"),
  route("api/verify-code", "routes/api/verify-code.tsx"),
  route("api/send-push", "routes/api/send-push.tsx"),
  route("api/device/add-device", "routes/api/device/add-device.tsx"),
  route("api/device/filter", "routes/api/device/filter.tsx"),
  route("api/device/:id/replay", "routes/api/device/$id/replay.tsx"),
  route("api/webauthn/register/options", "routes/api/webauthn/register/options.tsx"),
  route("api/webauthn/register/verify", "routes/api/webauthn/register/verify.tsx"),
  route("api/webauthn/login/options", "routes/api/webauthn/login/options.tsx"),
  route("api/webauthn/login/verify", "routes/api/webauthn/login/verify.tsx"),
  route("api/rooms", "routes/api/rooms.tsx"),
  route("api/rooms/:id", "routes/api/room.tsx"),
  route("api/rooms/:id/images", "routes/api/room.images.tsx"),
  route("api/rooms/:id/availability", "routes/api/room.availability.tsx"),
  // apiRoute("api/logout", {action:logoutAction}),
  // apiRoute("api/rooms/:id", { loader: roomLoader, action: roomAction }),
  // apiRoute("api/rooms/:id/availability", { loader: roomLoader }),

  // 👇 User-Agent 기반 redirect 먼저
  layout("redirect_mobile.tsx", [


    layout("./layout/header.tsx", [
      index("routes/index.tsx"),
      route("store", "routes/store.tsx"),
      layout("./layout/sidemenu.tsx", [
        route("store/model/:id", "routes/store/model.$id.tsx"),
        ...prefix("store/category", [
          index("routes/store/category/index.tsx"),
          route("all", "routes/store/category/all.tsx"),
          route("monthly", "routes/store/category/monthly.tsx"),
          route("weekly", "routes/store/category/weekly.tsx"),
          route("new", "routes/store/category/new.tsx"),
        ]),
        ...prefix("store/detection", [
          route("motion", "routes/store/detection/motion.tsx"),
          route("sound", "routes/store/detection/sound.tsx"),
          route("person", "routes/store/detection/person.tsx"),
          route("animal", "routes/store/detection/animal.tsx"),
        ]),
      ]),
      ...prefix("store/subscription", [
        index("routes/store/subscription/index.tsx")
      ]),
      ...prefix("store/device", [
        index("routes/store/device/index.tsx")
      ]),

      ...prefix("community", [
        index("routes/community/index.tsx"),
        route("discussion", "routes/community/discussion.tsx"),
        route("discussion/:id", "routes/community/discussion.$id.tsx"),
        route("enroll-dev", "routes/community/enroll-dev.tsx"),
      ]),

      route("dev", "routes/dev.tsx"),

      route("support", "routes/support.tsx"),
    ]),
    // 👇 인증 안 된 사용자만 진입가능
    layout("layout/auth-anon-only.tsx", [
      route("login", "routes/login.tsx"),
      route("sign-up", "routes/register.tsx"),
    ]),
    // 👇 인증된 사용자만 진입가능
    layout("./layout/auth-required.tsx", [
      ...prefix("admin", [
        // 👇 관리자만 진입가능
        layout("./layout/admin.tsx", [
          index("routes/admin/index.tsx"),
          route("home", "routes/admin/home.tsx"),
          route("sales", "routes/admin/sales.tsx"),
          route("developers", "routes/admin/developers.tsx"),
          route("customers", "routes/admin/customers.tsx"),
          route("community", "routes/admin/community.tsx"),
          route("analytics", "routes/admin/analytics.tsx"),
        ])
      ]),

      ...prefix("developers", [
        // 👇 개발자만 진입가능
        layout("./layout/developer.tsx", [
          ...prefix("workspace", [
            index("routes/developers/workspace/index.tsx"),
            route("upload-new", "routes/developers/workspace/upload-new.tsx"),
            route("edit/:id", "routes/developers/workspace/edit.$id.tsx"),
          ]),
          route("news", "routes/developers/news.tsx"),
          route("sales", "routes/developers/sales.tsx"),
        ]),
      ]),
    ]),


    ...MobileRoutes,
  ]),
  route("*", "not-found.tsx"),
] satisfies RouteConfig