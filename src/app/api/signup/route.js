import { NextResponse } from "next/server";
import { pool } from "@/config/database";
const swot = require("swot-node");
import { hash } from "bcrypt";
const crypto = require("crypto");

function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function POST(req) {
  const { email, firstName, lastName, password } = await req.json();

  // verify email
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const validEmail = await swot.isAcademic(email);
  if (!validEmail) {
    return NextResponse.json(
      { error: "Please enter a valid school email" },
      { status: 500 },
    );
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);

  const results = await pool.query(
    `
    
      INSERT INTO users (first_name, last_name, email, password)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
    [firstName, lastName, email, hashedPassword],
  );

  // generate token
  // send token to tokens
  // reutrn token in response
  const token = generateToken();

  try {
    const results2 = await pool.query(
      `
    INSERT INTO tokens (token, user_id)
    VALUES($1, $2)
    RETURNING *
  `,
      [token, results.rows[0].id],
    );
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ token }, { status: 201 });
}
