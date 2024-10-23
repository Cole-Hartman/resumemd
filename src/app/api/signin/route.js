import { NextResponse } from "next/server";
import { pool } from "@/config/database";
import { compare } from "bcrypt";
const crypto = require("crypto");

function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Compare email
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const rows = result.rowCount;
    if (rows === 0) {
      return NextResponse.json(
        { success: false, error: "Email incorrect" },
        { status: 401 },
      );
    }

    // Compare password
    const passFound = await compare(password, result.rows[0].password);
    if (!passFound) {
      return NextResponse.json(
        { success: false, error: "Password incorrect" },
        { status: 401 },
      );
    }

    console.log("DIDDY");
    // create token and post to tokens
    const token = generateToken();

    try {
      const results = await pool.query(
        `
    INSERT INTO tokens (token, user_id)
    VALUES($1, $2)
    RETURNING *
  `,
        [token, result.rows[0].id],
      );
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
