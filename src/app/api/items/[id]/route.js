import { NextResponse } from "next/server";
import { pool } from "@/config/database";

export async function GET(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    const result = await pool.query("SELECT * FROM items WHERE id=$1", [id]);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// name image price description

export async function POST(req) {
  try {
    const { name, image, price, description } = await req.json();

    // Verify required fields
    if (!name || !image || !price || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const results = await pool.query(
      `
      INSERT INTO items (message)
      VALUES($1, $2, $3, $4, $5)
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

// name image price description

export async function PATCH(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    const { name, image, price, description } = await req.json();

    // Verify required fields
    if (!name && !image && !price && !description) {
      return NextResponse.json(
        { error: "At least one field should be here" },
        { status: 400 },
      );
    }

    const results = await pool.query(
      `
      UPDATE items
      SET 
        name = COALESCE($2, name), 
        image = COALESCE($3, image), 
        price = COALESCE($4, price), 
        description = COALESCE($5, description)
      WHERE id = $1
      RETURNING *
      `,
      [id, name, image, price, description],
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

export async function DELETE(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();
    await pool.query("DELETE * FROM items WHERE id=$1", [id]);
    return NextResponse.json({ success: true, status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
