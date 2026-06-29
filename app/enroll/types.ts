export type Address = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
};

export const emptyAddress: Address = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
};

export type EnrollStepId =
  | "email"
  | "member-agreement"
  | "telehealth-consent"
  | "consents"
  | "key-acknowledgements"
  | "phone"
  | "shipping-address"
  | "billing-address";

export type EnrollState = {
  email?: string;
  agreedMemberAgreement: boolean;
  agreedTelehealth: boolean;
  agreedLegalTerms: boolean;
  agreedSms: boolean;
  agreedElectronicRecords: boolean;
  agreedKeyAcknowledgements: boolean;
  phone: string;
  shipping: Address;
  billingSameAsShipping: boolean;
  billing: Address;
};

/** Shape POSTed to /api/enroll. */
export type EnrollPayload = {
  email?: string;
  agreedMemberAgreement: boolean;
  agreedTelehealth: boolean;
  agreedLegalTerms: boolean;
  agreedSms: boolean;
  agreedElectronicRecords: boolean;
  agreedKeyAcknowledgements: boolean;
  memberAgreementVersion?: string;
  telehealthConsentVersion?: string;
  phone: string;
  shipping: Address;
  billingSameAsShipping: boolean;
  billing: Address;
};

/** Address is complete enough to ship to. line2 is optional. */
export function isAddressComplete(a: Address): boolean {
  return (
    a.line1.trim() !== "" &&
    a.city.trim() !== "" &&
    a.state.trim() !== "" &&
    a.zip.trim() !== ""
  );
}

/** Loose US phone check: at least 10 digits. */
export function isPhoneValid(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 10;
}

/** Loose email check (presence of a local part, @, and a dotted domain). */
export function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
