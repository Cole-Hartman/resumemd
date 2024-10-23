import { NextResponse } from "next/server";
import { pool } from "@/config/database";

export async function GET(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    const result = await pool.query("SELECT * FROM transactions WHERE id=$1", [
      id,
    ]);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
