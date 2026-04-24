"use client";

import { useState } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

type Props = {
  onContinue: () => void;
  onOptOut: () => Promise<void> | void;
  orderingFor: "self" | "loved_one";
};

export function InsuranceInfo({ onContinue, onOptOut, orderingFor }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [optedOut, setOptedOut] = useState(false);

  const handleOptOut = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await onOptOut();
      setOptedOut(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (optedOut) {
    return (
      <Screen>
        <ScreenHeading>Thank you.</ScreenHeading>
        <ScreenSub>
          We&rsquo;ll be in touch the moment LERA starts accepting Medicare and Medicaid.
        </ScreenSub>
        <div className="mt-10">
          <PrimaryButton onClick={() => (window.location.href = "/")} autoFocus>
            Back to home
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  const subject = orderingFor === "loved_one" ? "her" : "you";
  return (
    <Screen>
      <ScreenHeading>LERA isn&rsquo;t covered by Medicare or Medicaid yet.</ScreenHeading>
      <ScreenSub>
        If {subject}&rsquo;re open to paying out of pocket, you&rsquo;re welcome to keep going.
        Otherwise we&rsquo;ll let you know when coverage changes.
      </ScreenSub>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <PrimaryButton onClick={onContinue} autoFocus>
          Continue anyway
        </PrimaryButton>
        <PrimaryButton
          variant="ghost"
          onClick={handleOptOut}
          disabled={submitting}
        >
          {submitting ? "Saving\u2026" : "Keep me posted"}
        </PrimaryButton>
      </div>
    </Screen>
  );
}
