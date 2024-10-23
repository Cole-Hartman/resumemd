import { NextResponse } from "next/server";
import { pool } from "@/config/database";
import { useParams } from "react-router-dom";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 },
    );
  }
}
