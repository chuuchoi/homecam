// app/layout/auth-required.tsx
import { Outlet, useOutletContext } from "react-router";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/lib/auth";


export function loader({ request }: LoaderFunctionArgs) {
  const loginInfo = getUserFromRequest(request)
  if(!loginInfo) throw redirect('/m/?msg=need-login')
  return loginInfo
}

export default function AuthRequiredLayout({}) {
  return <Outlet />;
}
