// app/layout/auth-required.tsx
import { Outlet, useOutletContext } from "react-router";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/lib/auth";
import type { Route } from "./+types/auth-required";

export function loader({ request }: LoaderFunctionArgs) {
  const loginInfo = getUserFromRequest(request)
  if(!loginInfo) throw redirect('/login?msg=need-login')
  return loginInfo
}

export default function AuthRequiredLayout({loaderData}:Route.ComponentProps) {
  return <Outlet />;
}
