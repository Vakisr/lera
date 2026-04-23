import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("[pre-screening] qualified lead:", JSON.stringify(payload, null, 2));
  return NextResponse.json({ ok: true });
}
