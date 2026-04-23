"use client";

import { useEffect, useRef, useState } from "react";
import { EmailInput, isValidEmail } from "../EmailInput";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { LeadReason } from "../../types";

type Props = {
  heading: string;
  body: string;
  cta: string;
  reason: LeadReason;
  state?: string;
};

export function LeadCapture({ heading, body, cta, reason, state }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const valid = isValidEmail(email);
  const showError = touched && !valid && email.length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/lead-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          reason,
          ...(state ? { state } : {}),
          capturedAt: new Date().toISOString(),
        }),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Screen>
        <ScreenHeading>Thank you.</ScreenHeading>
        <ScreenSub>
          We&rsquo;ve got your email. We&rsquo;ll be in touch the moment we have news.
        </ScreenSub>
        <div className="mt-10">
          <PrimaryButton onClick={() => (window.location.href = "/")} autoFocus>
            Back to home
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
      <ScreenSub>{body}</ScreenSub>
      <form className="mt-10 space-y-6" onSubmit={submit}>
        <EmailInput
          ref={ref}
          placeholder="you@example.com"
          value={email}
          onBlur={() => setTouched(true)}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={showError}
        />
        <div className="h-5 text-sm text-coral" aria-live="polite">
          {showError ? "That email doesn't look quite right." : ""}
        </div>
        <PrimaryButton type="submit" disabled={!valid || submitting}>
          {submitting ? "Sending\u2026" : cta}
        </PrimaryButton>
      </form>
    </Screen>
  );
}
