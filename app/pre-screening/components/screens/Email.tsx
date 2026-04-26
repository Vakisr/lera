"use client";

import { useEffect, useRef, useState } from "react";
import { EmailInput, isValidEmail } from "../EmailInput";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
};

export function Email({ value, onChange, onNext }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const valid = isValidEmail(value);
  const showError = touched && !valid && value.length > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onNext();
  };

  return (
    <Screen>
      <ScreenHeading>Where should we send your results?</ScreenHeading>
      <ScreenSub>
        We&rsquo;ll save your progress here so you can pick up anytime.
      </ScreenSub>
      <form className="mt-10 space-y-6" onSubmit={submit}>
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
        <PrimaryButton type="submit" disabled={!valid}>
          Continue
        </PrimaryButton>
      </form>
    </Screen>
  );
}
