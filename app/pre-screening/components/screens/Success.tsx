"use client";

import { useState, type ReactNode } from "react";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import type { FlowMode } from "../../PreScreeningFlow";

type Props = {
  firstName: string;
  email?: string;
  lastName?: string;
  mode?: FlowMode;
};

const HIGHLIGHTS = [
  { title: "Whole-body testing", detail: "Blood, saliva, and gut" },
  { title: "A partner every day", detail: "Less than $1 a day" },
  { title: "Built for women", detail: "22 years of practice" },
];

const TESTING = [
  "Blood testing",
  "Saliva testing",
  "Stool & microbiome testing",
  "Comprehensive health assessment",
  "Personalized health roadmap",
];

const MONTHLY = [
  "Unlimited conversations with LERA",
  "Personalized recommendations that improve over time",
  "Care that adapts through every life stage",
  "Daily support and community access",
  "Progress tracking and symptom monitoring",
];

export function Success({ firstName, email, lastName, mode = "enroll" }: Props) {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const goToEnrollment = () => {
    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    window.location.href = `/enroll${query}`;
  };

  const joinWaitlist = async () => {
    if (joining || joined) return;
    setJoining(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      setJoined(true);
    } catch {
      // Non-blocking — still show confirmation so the user isn't stranded.
      setJoined(true);
    } finally {
      setJoining(false);
    }
  };

  return (
    <Screen center={false} xwide>
      <ScreenHeading>Welcome to LERA, {firstName}.</ScreenHeading>

      <p className="mt-3 text-lg text-forest/75">
        Based on what you shared, your testing will look at hormones + gut + metabolism + stress resilience + brain health.
      </p>

      {/* Trust highlights */}
      <div className="mt-6 grid grid-cols-1 divide-y divide-forest/10 overflow-hidden rounded-2xl border border-forest/10 bg-cream-50 shadow-soft sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className="px-6 py-4 text-center">
            <p className="font-display text-base text-forest">{h.title}</p>
            <p className="mt-1 text-sm text-forest/55">{h.detail}</p>
          </div>
        ))}
      </div>

      {/* Two-step plan */}
      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-stretch md:gap-0">
        <Tier
          step="Step 1"
          name="Initial Assessment & Testing"
          blurb="Your journey starts with a comprehensive look at your health."
          items={TESTING}
          price="$549"
          cadence="one-time"
          note="HSA/FSA eligible."
        />

        <Divider />

        <Tier
          step="Step 2"
          name="Daily Health Partner"
          blurb="Your health partner through every life stage."
          items={MONTHLY}
          price="$29"
          cadence="/month"
          note="HSA/FSA eligible. Less than $1 a day."
        />
      </div>

      {/* Annual membership clarity */}
      <div className="mt-6 rounded-2xl border border-forest/10 bg-cream-50 p-5 shadow-soft sm:p-6">
        <p className="font-display text-base text-forest">
          This is an annual membership
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-forest/70">
          <li>
            One plan covers both parts: your <span className="font-medium text-forest">$549 annual testing</span>{" "}
            and your <span className="font-medium text-forest">$29/month</span> membership.
          </li>
          <li>
            It renews once a year — <span className="font-medium text-forest">only with your approval</span> — to
            cover your next round of testing plus the year ahead.
          </li>
          <li>We&rsquo;ll always email you before any renewal, and you can change or cancel then. HSA/FSA eligible.</li>
        </ul>
      </div>

      {mode === "waitlist" ? (
        joined ? (
          <div className="mt-8 rounded-2xl border border-leaf/30 bg-mint-50 p-6">
            <p className="font-display text-xl text-forest">You&rsquo;re on the list.</p>
            <p className="mt-2 text-base text-forest/70">
              Thanks, {firstName}. We&rsquo;ll email you at {email} the moment a spot opens up.
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <PrimaryButton onClick={joinWaitlist} disabled={joining} autoFocus>
              <span className="inline-flex items-center gap-2">
                {joining ? "Signing you up…" : "Sign up to the waitlist"}
                <span aria-hidden>&rarr;</span>
              </span>
            </PrimaryButton>
          </div>
        )
      ) : (
        <div className="mt-8">
          <PrimaryButton onClick={goToEnrollment} autoFocus>
            <span className="inline-flex items-center gap-2">
              Continue to enrollment
              <span aria-hidden>&rarr;</span>
            </span>
          </PrimaryButton>
        </div>
      )}
    </Screen>
  );
}

function Divider() {
  return (
    <div className="relative flex items-center justify-center md:w-16">
      {/* Vertical line on desktop, horizontal on mobile */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-leaf/30 via-forest/10 to-coral/30 md:inset-x-auto md:inset-y-6 md:left-1/2 md:top-auto md:h-auto md:w-px md:-translate-x-1/2 md:translate-y-0 md:bg-gradient-to-b" />
      <span className="relative bg-cream px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-forest/45 md:rotate-180 md:px-1 md:py-3 md:[writing-mode:vertical-rl]">
        Then ongoing
      </span>
    </div>
  );
}

function Tier({
  step,
  name,
  blurb,
  items,
  price,
  cadence,
  note,
}: {
  step: string;
  name: string;
  blurb: string;
  items: string[];
  price: string;
  cadence: string;
  note: string;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-forest/10 bg-cream-50 p-7 shadow-soft sm:p-8">
      <span className="inline-flex w-fit items-center rounded-pill bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-forest/70">
        {step}
      </span>

      <h2 className="mt-5 font-display text-2xl text-forest">{name}</h2>
      <p className="mt-2 text-base text-forest/60">{blurb}</p>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base text-forest/90">
            <Check />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="h-px bg-forest/10" />
        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-display text-4xl text-forest sm:text-5xl">{price}</span>
          <span className="text-base text-forest/55">{cadence}</span>
        </div>
        <p className="mt-2 text-sm text-forest/55">{note}</p>
      </div>
    </div>
  );
}

function Check(): ReactNode {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mint-100 text-forest">
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden>
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
