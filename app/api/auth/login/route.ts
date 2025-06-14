import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Extend globalThis type to include FAKE_DB
declare global {
  var FAKE_DB: Record<string, { passwordHash: string }> | undefined;
}

const FAKE_DB: Record<string, { passwordHash: string }> = globalThis.FAKE_DB || (globalThis.FAKE_DB = {});
const JWT_SECRET = process.env.JWT_SECRET || "supersecret_dev_key";
const JWT_EXPIRES_IN = "7d";

function signJWT(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = FAKE_DB[username];
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = signJWT({ username });
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}