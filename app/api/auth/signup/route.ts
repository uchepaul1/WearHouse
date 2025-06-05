import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const FAKE_DB: Record<string, { passwordHash: string }> = globalThis.FAKE_DB || (globalThis.FAKE_DB = {});

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (FAKE_DB[username]) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  FAKE_DB[username] = { passwordHash };
  return NextResponse.json({ success: true });
}