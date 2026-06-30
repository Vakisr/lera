"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../../pre-screening/components/Screen";
import { Checkbox } from "./Checkbox";

export type ConsentsValue = {
  legalTerms: boolean;
  sms: boolean;
  electronicRecords: boolean;
};

type Props = {
  value: ConsentsValue;
  onChange: (next: ConsentsValue) => void;
  onContinue: () => void;
};

function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-leaf-600 underline underline-offset-2 hover:text-leaf-600/80"
    >
      {children}
    </a>
  );
}

export function ConsentsScreen({ value, onChange, onContinue }: Props) {
  const set = (patch: Partial<ConsentsValue>) => onChange({ ...value, ...patch });
  const canContinue = value.legalTerms && value.electronicRecords;

  return (
    <Screen center={false} wide>
      <ScreenHeading>A few other consents</ScreenHeading>
      <ScreenSub>Please confirm the following before we continue.</ScreenSub>

      <section className="mt-8 space-y-5 rounded-2xl border border-leaf/30 bg-mint-50 p-5 sm:p-7">
        <Checkbox checked={value.legalTerms} onChange={(c) => set({ legalTerms: c })}>
          I acknowledge and agree to the{" "}
          <DocLink href="https://lerahealth.com/legal/terms-of-service">Terms of Service</DocLink>,{" "}
          <DocLink href="https://lerahealth.com/legal/privacy-policy">Privacy Policy</DocLink>,{" "}
          <DocLink href="https://lerahealth.com/legal/telehealth-consent">Informed Consent &amp; Data Usage</DocLink>,{" "}
          <DocLink href="https://lerahealth.com/legal/hipaa-notice">HIPAA Notice of Privacy Practices</DocLink>, and{" "}
          <DocLink href="https://lerahealth.com/legal/medical-disclaimer">Medical Disclaimer</DocLink>.
        </Checkbox>

        <Checkbox checked={value.sms} onChange={(c) => set({ sms: c })}>
          I agree to receive SMS communications related to my care and account. Message
          frequency may vary. Message and data rates may apply. Reply STOP to opt out.{" "}
          <span className="text-forest/45">(optional)</span>
        </Checkbox>

        <Checkbox
          checked={value.electronicRecords}
          onChange={(c) => set({ electronicRecords: c })}
        >
          I consent to the use of electronic records and electronic signatures.
        </Checkbox>
      </section>

      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={onContinue} disabled={!canContinue} autoFocus>
          Continue
          <span aria-hidden>&rarr;</span>
        </PrimaryButton>
      </div>
    </Screen>
  );
}
