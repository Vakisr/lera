import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import type { Database } from "../../enroll/database.types";

type Address = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
};

type EnrollBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
  agreedMemberAgreement?: boolean;
  agreedTelehealth?: boolean;
  agreedLegalTerms?: boolean;
  agreedSms?: boolean;
  agreedElectronicRecords?: boolean;
  agreedKeyAcknowledgements?: boolean;
  memberAgreementVersion?: string;
  telehealthConsentVersion?: string;
  phone?: string;
  shipping?: Address;
  billingSameAsShipping?: boolean;
  billing?: Address;
};

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error("[enroll] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return NextResponse.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 },
    );
  }

  let body: EnrollBody;
  try {
    body = (await request.json()) as EnrollBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Required consents must be present.
  if (
    !body.agreedMemberAgreement ||
    !body.agreedTelehealth ||
    !body.agreedLegalTerms ||
    !body.agreedElectronicRecords ||
    !body.agreedKeyAcknowledgements
  ) {
    return NextResponse.json(
      { ok: false, error: "missing_required_consents" },
      { status: 400 },
    );
  }

  const supabase = createClient<Database>(url, anonKey);
  const shipping = body.shipping ?? {};
  const billing = body.billingSameAsShipping ? shipping : (body.billing ?? {});

  const row: Database["public"]["Tables"]["enrollments"]["Insert"] = {
    email: body.email ?? null,
    first_name: body.firstName ?? null,
    last_name: body.lastName ?? null,
    agreed_member_agreement: !!body.agreedMemberAgreement,
    agreed_telehealth_consent: !!body.agreedTelehealth,
    agreed_legal_terms: !!body.agreedLegalTerms,
    agreed_sms: !!body.agreedSms,
    agreed_electronic_records: !!body.agreedElectronicRecords,
    agreed_key_acknowledgements: !!body.agreedKeyAcknowledgements,
    member_agreement_version: body.memberAgreementVersion ?? null,
    telehealth_consent_version: body.telehealthConsentVersion ?? null,
    phone: body.phone ?? null,
    shipping_line1: shipping.line1 ?? null,
    shipping_line2: shipping.line2 ?? null,
    shipping_city: shipping.city ?? null,
    shipping_state: shipping.state ?? null,
    shipping_zip: shipping.zip ?? null,
    billing_same_as_shipping: body.billingSameAsShipping ?? true,
    billing_line1: billing.line1 ?? null,
    billing_line2: billing.line2 ?? null,
    billing_city: billing.city ?? null,
    billing_state: billing.state ?? null,
    billing_zip: billing.zip ?? null,
    user_agent: request.headers.get("user-agent"),
    status: "submitted",
  };

  // No .select() / RETURNING: the table is write-only (insert-only RLS, no SELECT
  // policy), so requesting a representation would trip the SELECT policy check.
  const { error } = await supabase.from("enrollments").insert(row);

  if (error) {
    console.error("[enroll] insert failed:", error.message);
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
