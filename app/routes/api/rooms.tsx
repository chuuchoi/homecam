// app/routes/api/room.ts
import { roomAction, roomLoader } from "~/actions/room";

export const loader = roomLoader;
export const action = roomAction;