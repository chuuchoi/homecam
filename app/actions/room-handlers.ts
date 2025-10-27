// app/actions/room-handlers
import type { RowDataPacket } from "mysql2";
import { pool } from "~/lib/db";

export async function getRooms() {
  const [rows] = await pool.execute("SELECT * FROM rooms");
  //@ts-ignore
  return new Response(JSON.stringify(rows), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function getRoomById(params: { id?: string }) {
  const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM rooms WHERE id = ?", [params.id]);
  if (rows.length === 0) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(rows[0]), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function getRoomImages(params: { id?: string }) {
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

export async function getRoomAvailability(params: { id?: string }, searchParams: URLSearchParams) {
  const date = searchParams.get("date");
  const [rows] = await pool.execute(
    `SELECT * FROM reservations WHERE room_id = ? AND reservation_date = ? AND status = 'confirmed'`,
    [params.id, date]
  );
  return new Response(JSON.stringify(rows), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function createRoom(request: Request) {
  const body = await request.json();
  const { name, capacity, description, price_per_hour } = body;
  const [result]: any = await pool.execute(
    `INSERT INTO rooms (name, capacity, description, price_per_hour) VALUES (?, ?, ?, ?)`,
    [name, capacity, description, price_per_hour]
  );
  return new Response(JSON.stringify({ id: result.insertId }), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function updateRoom(request: Request, params: { id?: string }) {
  const body = await request.json();
  const { name, capacity, description, price_per_hour, status } = body;
  const [result]: any = await pool.execute(
    `UPDATE rooms SET name=?, capacity=?, description=?, price_per_hour=?, status=? WHERE id=?`,
    [name, capacity, description, price_per_hour, status, params.id]
  );
  return new Response(JSON.stringify({ success: result.affectedRows > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteRoom(params: { id?: string }) {
  const [result]: any = await pool.execute(`DELETE FROM rooms WHERE id = ?`, [params.id]);
  return new Response(null, { status: result.affectedRows > 0 ? 204 : 404 });
}
