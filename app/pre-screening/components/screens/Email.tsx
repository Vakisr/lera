"use client";

import { useEffect, useRef, useState } from "react";
import { EmailInput, isValidEmail } from "../EmailInput";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void | Promise<void>;
};

export function Email({ value, onChange, onSubmit }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const valid = isValidEmail(value);
  const showError = touched && !valid && value.length > 0;

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <ScreenHeading>Where can we reach you?</ScreenHeading>
      <ScreenSub>We&apos;ll use this to save your progress and send next steps. No spam, ever.</ScreenSub>
      <form className="mt-10 space-y-6" onSubmit={handle}>
        <EmailInput
          ref={ref}
          placeholder="you@example.com"
          value={value}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={showError}
        />
        <div className="h-5 text-sm text-coral" aria-live="polite">
          {showError ? "That email doesn't look quite right." : ""}
        </div>
        <PrimaryButton type="submit" disabled={!valid || submitting}>
          {submitting ? "Sending\u2026" : "Continue"}
        </PrimaryButton>
      </form>
    </Screen>
  );
}
