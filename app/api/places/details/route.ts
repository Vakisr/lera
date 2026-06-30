import { NextResponse } from "next/server";

import { parseAddressComponents } from "../../../enroll/parseAddress";

// Server-side proxy for Google Places (New) place details → parsed address.
export async function POST(request: Request) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return NextResponse.json({ address: null });

  let body: { placeId?: string; sessionToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ address: null });
  }

  const placeId = body.placeId;
  if (!placeId) return NextResponse.json({ address: null });

  const qs = body.sessionToken
    ? `?sessionToken=${encodeURIComponent(body.sessionToken)}`
    : "";

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}${qs}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "addressComponents",
          Referer: "https://lera.vakis.workers.dev",
        },
      },
    );

    if (!res.ok) {
      console.error("[places] details failed:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ address: null });
    }

    const data = (await res.json()) as {
      addressComponents?: { longText?: string; shortText?: string; types: string[] }[];
    };
    return NextResponse.json({ address: parseAddressComponents(data.addressComponents) });
  } catch (e) {
    console.error("[places] details error:", String(e));
    return NextResponse.json({ address: null });
  }
}
