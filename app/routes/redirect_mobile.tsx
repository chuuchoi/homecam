// app/routes/redirect-mobile.tsx
import { useEffect } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { isMobileUserAgent } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const ua = request.headers.get("user-agent") || "";
  const url = new URL(request.url);
// console.log(ua)
if (isMobileUserAgent(ua) && !url.pathname.startsWith("/m")) {
  // 모바일인데 /m 이 아닌 경우 -> /m/... 으로 이동
  url.pathname = "/m" + url.pathname;
  return redirect(url.toString());
}

if (!isMobileUserAgent(ua) && url.pathname.startsWith("/m")) {
    // PC인데 /m/... 에 들어왔다면 원래 경로로 이동
    url.pathname = url.pathname.replace(/^\/m/, "");
    return redirect(url.toString());
  }

  return null; // 그냥 통과
}

export default function RedirectMobile({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    const ua = navigator.userAgent
    const isMobile = isMobileUserAgent(ua)
    if(isMobile && !location.pathname.startsWith('/m')){
      navigate('/m' + location.pathname + location.search, { replace: true })
    }else if(!isMobile && location.pathname.startsWith('/m')){
      navigate(location.pathname.replace(/^\/m/, ''), { replace: true })
    }
  },[location, navigate])

  return <Outlet />
}
