// app/routes/api/logout.ts
import { redirect, type ActionFunctionArgs } from "react-router";
import { getCookieValue, removeToken } from "~/lib/auth";

export function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const token = getCookieValue(cookieHeader, "token");
  console.log("action`````")
  removeToken(token)
  return redirect ("/",{
    headers: {// 쿠키 만료
      "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
    },
  })
}

export function loader({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const token = getCookieValue(cookieHeader, "token");
  removeToken(token)
  return new Response(null, {
    status: 302,
    headers: {// 쿠키 만료
      "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
      Location: "/",
    },
  });
}

export default function Logout(){
  return null
}