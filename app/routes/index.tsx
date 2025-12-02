// routes/index.tsx
import { redirect, type LoaderFunctionArgs } from "react-router";
import { isMobileUserAgent } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const ua = request.headers.get("user-agent") || "";
  if (isMobileUserAgent(ua)) {// 모바일인 경우
    return redirect('/m/home');
  }
  else return redirect('/store');
}
