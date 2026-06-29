"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { BackButton } from "../pre-screening/components/BackButton";
import { ProgressBar } from "../pre-screening/components/ProgressBar";
import { memberAgreement, telehealthConsent } from "./agreements";
import { AgreementScreen } from "./components/AgreementScreen";
import { BillingAddressScreen } from "./components/BillingAddressScreen";
import { ConsentsScreen } from "./components/ConsentsScreen";
import { KeyAcknowledgementsScreen } from "./components/KeyAcknowledgementsScreen";
import { PhoneScreen } from "./components/PhoneScreen";
import { ShippingAddressScreen } from "./components/ShippingAddressScreen";
import { STRIPE_CHECKOUT_URL } from "./constants";
import {
  emptyAddress,
  type Address,
  type EnrollPayload,
  type EnrollState,
  type EnrollStepId,
} from "./types";

const STEPS: EnrollStepId[] = [
  "member-agreement",
  "telehealth-consent",
  "consents",
  "key-acknowledgements",
  "phone",
  "shipping-address",
  "billing-address",
];

const initialState: EnrollState = {
  agreedMemberAgreement: false,
  agreedTelehealth: false,
  agreedLegalTerms: false,
  agreedSms: false,
  agreedElectronicRecords: false,
  agreedKeyAcknowledgements: false,
  phone: "",
  shipping: { ...emptyAddress },
  billingSameAsShipping: true,
  billing: { ...emptyAddress },
};

export default function EnrollPage() {
  const [state, setState] = useState<EnrollState>(initialState);
  const [history, setHistory] = useState<EnrollStepId[]>(["member-agreement"]);
  const [submitting, setSubmitting] = useState(false);
  const current = history[history.length - 1];

  // Capture an optional ?email= for later linkage to a pre-screening lead.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) setState((s) => ({ ...s, email }));
  }, []);

  const goTo = useCallback((next: EnrollStepId) => {
    setHistory((h) => [...h, next]);
  }, []);

  const back = useCallback(() => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }, []);

  const advanceFrom = (step: EnrollStepId) => {
    const i = STEPS.indexOf(step);
    if (i >= 0 && i < STEPS.length - 1) goTo(STEPS[i + 1]);
  };

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const payload: EnrollPayload = {
      email: state.email,
      agreedMemberAgreement: state.agreedMemberAgreement,
      agreedTelehealth: state.agreedTelehealth,
      agreedLegalTerms: state.agreedLegalTerms,
      agreedSms: state.agreedSms,
      agreedElectronicRecords: state.agreedElectronicRecords,
      agreedKeyAcknowledgements: state.agreedKeyAcknowledgements,
      memberAgreementVersion: memberAgreement.effectiveDate,
      telehealthConsentVersion: telehealthConsent.effectiveDate,
      phone: state.phone.trim(),
      shipping: state.shipping,
      billingSameAsShipping: state.billingSameAsShipping,
      billing: state.billingSameAsShipping ? state.shipping : state.billing,
    };
    try {
      await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Non-blocking: still hand off to checkout so the user isn't stranded.
    }
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  const progress = STEPS.indexOf(current) / (STEPS.length - 1);
  const showBack = history.length > 1;

  const setShipping = (shipping: Address) => setState((s) => ({ ...s, shipping }));

  const render = () => {
    switch (current) {
      case "member-agreement":
        return (
          <AgreementScreen
            key="member-agreement"
            agreement={memberAgreement}
            checked={state.agreedMemberAgreement}
            onChange={(c) => setState((s) => ({ ...s, agreedMemberAgreement: c }))}
            onContinue={() => advanceFrom("member-agreement")}
          />
        );

      case "telehealth-consent":
        return (
          <AgreementScreen
            key="telehealth-consent"
            agreement={telehealthConsent}
            checked={state.agreedTelehealth}
            onChange={(c) => setState((s) => ({ ...s, agreedTelehealth: c }))}
            onContinue={() => advanceFrom("telehealth-consent")}
          />
        );

      case "consents":
        return (
          <ConsentsScreen
            key="consents"
            value={{
              legalTerms: state.agreedLegalTerms,
              sms: state.agreedSms,
              electronicRecords: state.agreedElectronicRecords,
            }}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                agreedLegalTerms: v.legalTerms,
                agreedSms: v.sms,
                agreedElectronicRecords: v.electronicRecords,
              }))
            }
            onContinue={() => advanceFrom("consents")}
          />
        );

      case "key-acknowledgements":
        return (
          <KeyAcknowledgementsScreen
            key="key-acknowledgements"
            checked={state.agreedKeyAcknowledgements}
            onChange={(c) => setState((s) => ({ ...s, agreedKeyAcknowledgements: c }))}
            onContinue={() => advanceFrom("key-acknowledgements")}
          />
        );

      case "phone":
        return (
          <PhoneScreen
            key="phone"
            value={state.phone}
            onChange={(phone) => setState((s) => ({ ...s, phone }))}
            onContinue={() => advanceFrom("phone")}
          />
        );

      case "shipping-address":
        return (
          <ShippingAddressScreen
            key="shipping-address"
            value={state.shipping}
            onChange={setShipping}
            onContinue={() => advanceFrom("shipping-address")}
          />
        );

      case "billing-address":
        return (
          <BillingAddressScreen
            key="billing-address"
            sameAsShipping={state.billingSameAsShipping}
            onSameAsShippingChange={(billingSameAsShipping) =>
              setState((s) => ({ ...s, billingSameAsShipping }))
            }
            billing={state.billing}
            onBillingChange={(billing) => setState((s) => ({ ...s, billing }))}
            onContinue={submit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      <ProgressBar value={progress} />
      {showBack && <BackButton onClick={back} />}
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {render()}
        </AnimatePresence>
      </div>
    </main>
  );
}
