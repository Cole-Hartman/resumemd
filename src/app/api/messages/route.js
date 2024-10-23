import { NextResponse } from "next/server";
import { pool } from "@/config/database";

export async function POST(req) {
  try {
    console.log("DEBUG", req);
    const { content } = await req.json();
    console.log("API", content);

    // Verify required fields
    if (!content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const results = await pool.query(
      `
      INSERT INTO messages (message)
      VALUES($1)
      RETURNING *
    `,
      [content],
    );

    return NextResponse.json(results.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error processing message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
