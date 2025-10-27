import type { LoaderFunctionArgs } from "react-router";
import { isEmailTaken } from "~/lib/db/user";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim();

  if (!email) {
    return new Response(
      JSON.stringify({ error: "이메일이 필요합니다." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const taken = await isEmailTaken(email);

  return new Response(
    JSON.stringify({ taken }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
