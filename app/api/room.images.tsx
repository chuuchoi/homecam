// app/api/room.images.ts
// import { roomLoader } from "~/actions/room";
// import { getRoomImages } from "~/actions/room-handlers";
import type { LoaderFunctionArgs } from "react-router";

// export const loader = ({params} : any) =>getRoomImages(params);
export const loader = async ({ params }: LoaderFunctionArgs) => {
  // console.log(params, request)
  const fs = await import("fs/promises");
  const path = await import("path");
  const imageDir = path.join(process.cwd(), "public/room_images", params.id!);
  try {
    const files = await fs.readdir(imageDir);
    const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .map(f => `/room_images/${params.id}/${f}`);
    return new Response(JSON.stringify({ images }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ images: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
