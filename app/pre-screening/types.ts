export type FeelLikeSelf = "yes" | "not_quite" | "no";

export type Gender = "woman" | "not_woman";
export type Device = "iphone" | "android";
export type YesNo = "yes" | "no";
export type OrderingFor = "self" | "loved_one";

export type SymptomId =
  | "tired"
  | "focus"
  | "weight"
  | "cycles_flashes"
  | "bloated"
  | "pregnancy"
  | "migraines"
  | "other";

// Labels are written in first-person. The orderingFor === 'loved_one' flow
// swaps a couple of them for third-person via `symptomLabel` below.
export const SYMPTOM_OPTIONS: { id: SymptomId; label: string }[] = [
  { id: "tired", label: "Tired in a way sleep doesn\u2019t fix" },
  { id: "focus", label: "The focus you used to have is gone" },
  { id: "weight", label: "Weight that won\u2019t shift" },
  { id: "cycles_flashes", label: "Cycles feel off, hot flashes, or night sweats" },
  { id: "bloated", label: "Bloated all the time" },
  { id: "pregnancy", label: "Struggling to get pregnant" },
  { id: "migraines", label: "Migraines that won\u2019t budge" },
  { id: "other", label: "Something else" },
];

const LOVED_ONE_SYMPTOM_OVERRIDES: Partial<Record<SymptomId, string>> = {
  focus: "The focus she used to have is gone",
};

export function symptomLabel(id: SymptomId, orderingFor: OrderingFor): string {
  if (orderingFor === "loved_one" && LOVED_ONE_SYMPTOM_OVERRIDES[id]) {
    return LOVED_ONE_SYMPTOM_OVERRIDES[id]!;
  }
  return SYMPTOM_OPTIONS.find((o) => o.id === id)?.label ?? String(id);
}

export type PreScreeningState = {
  email: string;
  gender?: Gender;
  orderingFor?: OrderingFor;
  feelLikeSelf?: FeelLikeSelf;
  symptoms: SymptomId[];
  otherSymptomText: string;
  device?: Device;
  location?: string;
  age: number;
  medicareMedicaid?: YesNo;
  firstName: string;
  lastName: string;
};

// Service-area note: LERA isn't live in any state yet. Everyone who makes
// it to submission is captured as a lead on Stripe checkout. The payload
// stores all the rich profile data for downstream routing.
export type PreScreeningPayload = {
  email: string;
  gender: Gender;
  orderingFor: OrderingFor;
  feelLikeSelf: FeelLikeSelf;
  symptoms: SymptomId[];
  otherSymptomText?: string;
  device: Device;
  location: string;
  age: number;
  medicareMedicaid: YesNo;
  firstName: string;
  lastName: string;
  outcome: "qualified";
  completedAt: string;
};

export type LeadReason =
  | "android"
  | "location"
  | "outside_us"
  | "medicare_medicaid"
  | "men_waitlist";

export type LeadListPayload = {
  email: string;
  reason: LeadReason;
  state?: string;
  capturedAt: string;
};

// Ordered list of step IDs for the qualified path. Email now comes second
// so we capture a lead on anyone who makes it past the welcome screen.
// "loved-one" sits outside this list because it's a side-spur only men see.
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
  | "loved-one"
  | "men-lead"
  | "device-lead"
  | "location-lead-state"
  | "location-lead-intl"
  | "insurance-info";

// Steps where the top progress bar and step counter are hidden.
export const HIDE_PROGRESS_ON: StepId[] = [
  "welcome",
  "loved-one",
  "men-lead",
  "device-lead",
  "location-lead-state",
  "location-lead-intl",
  "insurance-info",
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
