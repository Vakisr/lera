import { memberAgreement } from "./memberAgreement";
import { telehealthConsent } from "./telehealthConsent";
import type { Agreement } from "./types";

export type { Agreement, AgreementBlock } from "./types";
export { agreementToPlainText } from "./types";
export { memberAgreement } from "./memberAgreement";
export { telehealthConsent } from "./telehealthConsent";

/** Documents that have full content and a real signing/review experience.
 *  The linked legal docs (Terms, Privacy, etc.) live on the marketing site
 *  (lerahealth.com/legal/*) and are linked directly from the consents screen. */
export const AGREEMENTS: Agreement[] = [memberAgreement, telehealthConsent];

export function getAgreement(slug: string): Agreement | undefined {
  return AGREEMENTS.find((a) => a.slug === slug);
}
