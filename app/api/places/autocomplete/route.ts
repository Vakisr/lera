import { NextResponse } from "next/server";

// Server-side proxy for Google Places (New) autocomplete. Keeps the API key
// out of the browser entirely.
export async function POST(request: Request) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return NextResponse.json({ suggestions: [] });

  let body: { input?: string; sessionToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ suggestions: [] });
  }

  const input = (body.input ?? "").trim();
  if (input.length < 3) return NextResponse.json({ suggestions: [] });

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text",
        // Lets a referrer-restricted key work server-side; harmless for an
        // unrestricted/IP-restricted key.
        Referer: "https://lera.vakis.workers.dev",
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ["us"],
        ...(body.sessionToken ? { sessionToken: body.sessionToken } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[places] autocomplete failed:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ suggestions: [] });
    }

    const data = (await res.json()) as {
      suggestions?: { placePrediction?: { placeId: string; text?: { text?: string } } }[];
    };
    const suggestions = (data.suggestions ?? [])
      .filter((s) => s.placePrediction)
      .map((s) => ({
        placeId: s.placePrediction!.placeId,
        label: s.placePrediction!.text?.text ?? "",
      }));
    return NextResponse.json({ suggestions });
  } catch (e) {
    console.error("[places] autocomplete error:", String(e));
    return NextResponse.json({ suggestions: [] });
  }
}
