// app/actions/room.ts
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import {
  getRooms,
  getRoomById,
  getRoomImages,
  getRoomAvailability,
  createRoom,
  updateRoom,
  deleteRoom,
} from "./room-handlers";

export async function roomLoader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  if (method !== "GET") throw new Response("Method Not Allowed", { status: 405 });

  if (/\/api\/rooms\/[^/]+\/images$/.test(pathname)) {
    return getRoomImages(params);
  }

  if (/\/api\/rooms\/[^/]+\/availability$/.test(pathname)) {
    console.log(params)
    return getRoomAvailability(params, url.searchParams);
  }

  if (params.id) {
    return getRoomById(params);
  }

  return getRooms();
}

export async function roomAction({ request, params }: ActionFunctionArgs) {
  const method = request.method;

  switch (method) {
    case "POST":
      return createRoom(request);
    case "PUT":
      return updateRoom(request, params);
    case "DELETE":
      return deleteRoom(params);
    default:
      throw new Response("Method Not Allowed", { status: 405 });
  }
}
