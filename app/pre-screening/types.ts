export type FeelLikeSelf = "yes" | "not_quite" | "no";

export type Gender = "woman" | "not_woman";
export type Device = "iphone" | "android";
export type YesNo = "yes" | "no";

export type SymptomId =
  | "tired"
  | "focus"
  | "weight"
  | "cycles_flashes"
  | "bloated"
  | "pregnancy_struggle"
  | "migraines"
  | "something_else";

export const SYMPTOM_OPTIONS: { id: SymptomId; label: string }[] = [
  { id: "tired", label: "Tired in a way sleep doesn\u2019t fix" },
  { id: "focus", label: "The focus you used to have is gone" },
  { id: "weight", label: "Weight that won\u2019t shift" },
  { id: "cycles_flashes", label: "Cycles feel off, hot flashes, or night sweats" },
  { id: "bloated", label: "Bloated all the time" },
  { id: "pregnancy_struggle", label: "Struggling to get pregnant" },
  { id: "migraines", label: "Migraines that won\u2019t budge" },
  { id: "something_else", label: "Something else" },
];

export const SOMETHING_ELSE_ID: SymptomId = "something_else";

export type PreScreeningState = {
  gender?: Gender;
  // Set only when gender is "not_woman" and the buyer is purchasing on behalf
  // of a woman in their life. Flips downstream copy from "you/your" to
  // "she/her" and collects her details rather than the buyer's.
  orderingForLovedOne?: YesNo;
  feelLikeSelf?: FeelLikeSelf;
  symptoms: SymptomId[];
  symptomOther: string;
  device?: Device;
  location?: string;
  age: number;
  medicareMedicaid?: YesNo;
  firstName: string;
  lastName: string;
  email: string;
};

// NOTE (service area): LERA delivers to every US state AND internationally
// EXCEPT New York and New Jersey. NY/NJ users are the only location-based lead
// captures; everyone else completes the full flow and qualifies.
export type PreScreeningPayload = {
  gender: Gender;
  orderingForLovedOne?: YesNo;
  feelLikeSelf: FeelLikeSelf;
  symptoms: SymptomId[];
  symptomOther?: string;
  device: Device;
  location: string; // two-letter state code, or "outside_us"
  age: number;
  medicareMedicaid: YesNo;
  firstName: string;
  lastName: string;
  email: string;
  outcome: "qualified";
  completedAt: string;
};

export type LeadReason = "android" | "location" | "men";

export type LeadListPayload = {
  email: string;
  reason: LeadReason;
  state?: string;
  capturedAt: string;
};

// Ordered list of step IDs in the full path. Used to drive both
// the progress bar and the forward/back transitions.
export const QUALIFIED_STEPS = [
  "welcome",
  "email",
  "gender",
  "transition",
  "symptom-opener",
  "symptom-multi",
  "pivot",
  "device",
  "location",
  "age",
  "insurance",
  "first-name",
  "last-name",
  "success",
] as const;

export type StepId =
  | (typeof QUALIFIED_STEPS)[number]
  | "gender-reject"
  | "men-lead"
  | "device-lead"
  | "location-lead-state"
  | "insurance-notice";

export const HIDE_PROGRESS_ON: StepId[] = [
  "welcome",
  "gender-reject",
  "men-lead",
  "device-lead",
  "location-lead-state",
  "success",
];

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export const OUTSIDE_US = "outside_us";

export function stateName(code: string): string {
  if (code === OUTSIDE_US) return "outside the US";
  return US_STATES.find((s) => s.code === code)?.name ?? code;
}
