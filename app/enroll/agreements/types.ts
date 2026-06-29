// Shared types for enrollment agreements (Member Agreement, Telehealth Consent, …).
// Content is kept as structured data so it can be rendered on a signing screen,
// rendered on a full-page review route, and flattened to plain text for download.

export type AgreementBlock =
  | { kind: "para"; text: string }
  | { kind: "section"; n: number; title: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "note"; label: string; text: string }
  | { kind: "callout"; text: string };

export type Agreement = {
  /** URL-safe id, also used as the document review route slug. */
  slug: string;
  /** Display title, e.g. "Member Agreement". */
  title: string;
  /** Effective date, stored as the signed "version" when present. */
  effectiveDate?: string;
  /** Checkbox label shown on the signing screen. */
  consentLabel: string;
  blocks: AgreementBlock[];
};

/** Flatten an agreement into plain text for the "Download document" action. */
export function agreementToPlainText(agreement: Agreement): string {
  const lines: string[] = [agreement.title];
  if (agreement.effectiveDate) {
    lines.push(`Effective Date: ${agreement.effectiveDate}`);
  }
  lines.push("");
  for (const block of agreement.blocks) {
    switch (block.kind) {
      case "section":
        lines.push("", `${block.n}. ${block.title}`);
        break;
      case "subheading":
        lines.push("", block.text);
        break;
      case "para":
      case "callout":
        lines.push(block.text);
        break;
      case "note":
        lines.push(`${block.label}: ${block.text}`);
        break;
      case "list":
        for (const item of block.items) lines.push(`  • ${item}`);
        break;
    }
  }
  return lines.join("\n");
}
