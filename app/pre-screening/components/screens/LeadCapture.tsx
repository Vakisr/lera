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
  /** Email already captured earlier in the flow; when provided the
   *  screen auto-submits and skips the form entirely. */
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
  const [email, setEmail] = useState(prefilledEmail ?? "");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const hasValidPrefill = !!prefilledEmail && isValidEmail(prefilledEmail);

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

  // Auto-submit on mount when we already captured the email upstream.
  // Runs exactly once; prefilledEmail is treated as a mount-time value.
  useEffect(() => {
    if (!hasValidPrefill) {
      ref.current?.focus();
      return;
    }
    let cancelled = false;
    setSubmitting(true);
    postLead(prefilledEmail!)
      .catch(() => {
        // Swallow: we still want to thank the user.
      })
      .finally(() => {
        if (cancelled) return;
        setSubmitting(false);
        setDone(true);
      });
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

  // While we auto-submit a prefilled email, show the heading with a quiet
  // status line rather than the form. Keeps the page from flashing an empty
  // input the user would only have to re-fill.
  if (hasValidPrefill) {
    return (
      <Screen>
        <ScreenHeading>{heading}</ScreenHeading>
        <ScreenSub>{body}</ScreenSub>
        <p className="mt-10 text-sm text-forest/55" aria-live="polite">
          Saving your spot…
        </p>
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
          {submitting ? "Sending…" : cta}
        </PrimaryButton>
      </form>
    </Screen>
  );
}
