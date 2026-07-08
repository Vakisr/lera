export type FeelLikeSelf = "yes" | "not_quite" | "no";

export type Gender = "woman" | "not_woman";
export type Device = "iphone" | "android";
export type YesNo = "yes" | "no";
export type OrderingFor = "self" | "loved_one";

export type SymptomId =
  | "tired"
  | "focus"
  | "weight_bloating"
  | "cycles_flashes"
  | "pregnancy"
  | "headaches"
  | "mood"
  | "other";

// Labels are written in first-person. The orderingFor === 'loved_one' flow
// swaps them for third-person via `symptomLabel` below.
export const SYMPTOM_OPTIONS: { id: SymptomId; label: string }[] = [
  { id: "tired", label: "I sleep, but I never wake up feeling rested" },
  { id: "focus", label: "I feel foggy and forgetful, it\u2019s like I\u2019m no longer myself" },
  { id: "weight_bloating", label: "I know how my body used to feel, but nothing I do gets it back" },
  { id: "cycles_flashes", label: "My hormones feel all over the place" },
  { id: "mood", label: "It feels like my moods and anxiety are running the show" },
  { id: "pregnancy", label: "I want to get pregnant, and it\u2019s just not happening" },
  { id: "headaches", label: "I am so done with the headaches and aches" },
  { id: "other", label: "Something is going on, but no one can tell me what" },
];

const LOVED_ONE_SYMPTOM_OVERRIDES: Partial<Record<SymptomId, string>> = {
  tired: "She sleeps, but never wakes up feeling rested",
  focus: "She feels foggy and forgetful, like she\u2019s no longer herself",
  weight_bloating: "She knows how her body used to feel, but nothing she does gets it back",
  cycles_flashes: "Her hormones feel all over the place",
  mood: "It feels like her moods and anxiety are running the show",
  pregnancy: "She wants to get pregnant, and it\u2019s just not happening",
  headaches: "She\u2019s so done with the headaches and aches",
  other: "Something is going on, but no one can tell her what",
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
  dob: string; // ISO date "YYYY-MM-DD"
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
  dob: string; // ISO date "YYYY-MM-DD"
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
  | "medicare_medicaid";

export type LeadListPayload = {
  email: string;
  reason: LeadReason;
  state?: string;
  capturedAt: string;
};

// Ordered list of step IDs for the qualified path. Email comes first
// so we capture a lead on anyone who makes it past the home page.
export const QUALIFIED_STEPS = [
  "email",
  "transition",
  "symptom-opener",
  "symptom-multi",
  "pivot",
  "device",
  "location",
  "dob",
  "insurance",
  "first-name",
  "last-name",
  "success",
] as const;

export type StepId =
  | (typeof QUALIFIED_STEPS)[number]
  | "welcome"
  | "device-lead"
  | "location-lead-state"
  | "location-lead-intl"
  | "insurance-lead";

// Steps where the top progress bar and step counter are hidden.
export const HIDE_PROGRESS_ON: StepId[] = [
  "welcome",
  "device-lead",
  "location-lead-state",
  "location-lead-intl",
  "insurance-lead",
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
