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
  /** If provided (email already captured earlier), we skip the email prompt
   *  and just POST + show thanks on mount. */
  prefilledEmail?: string;
};

export function LeadCapture({
  heading,
  body,
  cta,
  reason,
  state,
  prefilledEmail,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const postLead = async (value: string) => {
    await fetch("/api/lead-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: value.trim(),
        reason,
        ...(state ? { state } : {}),
        capturedAt: new Date().toISOString(),
      }),
    });
  };

  // If we already have the email from earlier in the flow, capture silently
  // on mount and jump straight to the thank-you state.
  useEffect(() => {
    if (!prefilledEmail) {
      ref.current?.focus();
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await postLead(prefilledEmail);
      } catch {
        // non-blocking; we still show thanks
      }
      if (!cancelled) setDone(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valid = isValidEmail(email);
  const showError = touched && !valid && email.length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await postLead(email);
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
          We&rsquo;ll be in touch the moment we have news.
        </ScreenSub>
        <div className="mt-10">
          <PrimaryButton onClick={() => (window.location.href = "/")} autoFocus>
            Back to home
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  // prefilledEmail + not done means the POST is in flight. Brief spinner-ish
  // heading so users see something rather than a flash of the form.
  if (prefilledEmail) {
    return (
      <Screen>
        <ScreenHeading>{heading}</ScreenHeading>
        <ScreenSub>Saving your spot&hellip;</ScreenSub>
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
