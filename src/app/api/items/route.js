import { NextResponse } from "next/server";
import { pool } from "@/config/database";
import { headers } from "next/headers";

export async function GET() {
  try {
    // get current token
    const headersList = headers();
    const authHeader = headersList.get("authorization");
    const token = authHeader.split(" ").pop();

    // check if it's in tokens table
    const inTokens = await pool.query("SELECT * FROM tokens WHERE token = $1", [
      token,
    ]);
    console.log("In tokens?", inTokens.rowCount);

    //If token = 0, return err
    if (inTokens.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const result = await pool.query("SELECT * FROM items");
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 },
    );
  }
}
// name image price description

export async function POST(req) {
  try {
    // Verify required fields
    const { name, image, price, description } = await req.json();
    if (!name || !image || !price || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const results = await pool.query(
      `
      INSERT INTO items (name, img, price, description)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, image, price, description],
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
