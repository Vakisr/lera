import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type WaitlistBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error("[waitlist] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return NextResponse.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 },
    );
  }

  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email) {
    return NextResponse.json({ ok: false, error: "missing_email" }, { status: 400 });
  }

  const supabase = createClient(url, anonKey);

  // Partial record — creates or updates the row for this email without touching
  // any consent/billing fields already captured.
  const p = {
    email,
    first_name: body.firstName ?? null,
    last_name: body.lastName ?? null,
    user_agent: request.headers.get("user-agent"),
    status: "waitlist",
  };

  const { error } = await supabase.rpc("upsert_enrollment", { p });
  if (error) {
    console.error("[waitlist] upsert failed:", error.message);
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
