"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { BackButton } from "./components/BackButton";
import { ProgressBar } from "./components/ProgressBar";
import { StepCounter } from "./components/StepCounter";

import { Age } from "./components/screens/Age";
import { Device } from "./components/screens/Device";
import { Email } from "./components/screens/Email";
import { FirstName } from "./components/screens/FirstName";
import { Gender } from "./components/screens/Gender";
import { Insurance } from "./components/screens/Insurance";
import { InsuranceInfo } from "./components/screens/InsuranceInfo";
import { LastName } from "./components/screens/LastName";
import { LeadCapture } from "./components/screens/LeadCapture";
import { Location } from "./components/screens/Location";
import { LovedOne } from "./components/screens/LovedOne";
import { Pivot } from "./components/screens/Pivot";
import { Success } from "./components/screens/Success";
import { SymptomMultiSelect } from "./components/screens/SymptomMultiSelect";
import { SymptomOpener } from "./components/screens/SymptomOpener";
import { Transition as TransitionScreen } from "./components/screens/Transition";
import { Welcome } from "./components/screens/Welcome";

import {
  HIDE_PROGRESS_ON,
  OUTSIDE_US,
  QUALIFIED_STEPS,
  stateName,
  type Device as DeviceT,
  type FeelLikeSelf,
  type Gender as GenderT,
  type OrderingFor,
  type PreScreeningPayload,
  type PreScreeningState,
  type StepId,
  type SymptomId,
  type YesNo,
} from "./types";

const initialState: PreScreeningState = {
  email: "",
  symptoms: [],
  otherSymptomText: "",
  age: 35,
  firstName: "",
  lastName: "",
};

export default function PreScreeningPage() {
  const [state, setState] = useState<PreScreeningState>(initialState);
  const [history, setHistory] = useState<StepId[]>(["welcome"]);
  const current = history[history.length - 1];

  const goTo = useCallback((next: StepId) => {
    setHistory((h) => [...h, next]);
  }, []);

  const back = useCallback(() => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }, []);

  const historyRef = useRef(history);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  // Single sentinel browser-history entry so browser-back maps to one internal
  // step. Previously we pushed an entry per step and the two histories could
  // drift, causing back to skip multiple steps at once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.pushState({ lera: true }, "");
    const onPop = () => {
      if (historyRef.current.length > 1) {
        setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
        window.history.pushState({ lera: true }, "");
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Keyboard: Esc / ArrowLeft = back, ArrowRight = primary action.
  useEffect(() => {
    const isTypingTarget = (el: Element | null): boolean => {
      if (!el) return false;
      if (el instanceof HTMLInputElement) {
        const t = el.type;
        return (
          t === "text" ||
          t === "email" ||
          t === "search" ||
          t === "tel" ||
          t === "url" ||
          t === "password" ||
          t === "number" ||
          t === "range"
        );
      }
      return el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        e.preventDefault();
        back();
        return;
      }
      if (e.key === "ArrowLeft") {
        if (isTypingTarget(document.activeElement)) return;
        e.preventDefault();
        back();
        return;
      }
      if (e.key === "ArrowRight") {
        if (isTypingTarget(document.activeElement)) return;
        const btn = document.querySelector<HTMLButtonElement>(
          '[data-primary-action="true"]',
        );
        if (btn && !btn.disabled) {
          e.preventDefault();
          btn.click();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back]);

  const orderingFor: OrderingFor = state.orderingFor ?? "self";

  const postMedicareLead = async () => {
    if (!state.email) return;
    try {
      await fetch("/api/lead-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email.trim(),
          reason: "medicare_medicaid",
          capturedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // non-blocking
    }
  };

  const submitQualified = async () => {
    const payload: PreScreeningPayload = {
      email: state.email.trim(),
      gender: state.gender!,
      orderingFor,
      feelLikeSelf: state.feelLikeSelf!,
      symptoms: state.symptoms,
      otherSymptomText: state.symptoms.includes("other")
        ? state.otherSymptomText.trim() || undefined
        : undefined,
      device: state.device!,
      location: state.location!,
      age: state.age,
      medicareMedicaid: state.medicareMedicaid!,
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      outcome: "qualified",
      completedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/pre-screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Non-blocking. We still advance to the thank-you screen so the
      // user isn't stranded mid-flow if the stub API misbehaves.
    }
    goTo("success");
  };

  // Progress: count qualified-path step position. "loved-one" sits outside
  // the list since only the loved-one branch visits it.
  const qualifiedIndex = QUALIFIED_STEPS.indexOf(
    current as (typeof QUALIFIED_STEPS)[number],
  );
  const totalCountedSteps = QUALIFIED_STEPS.length - 2; // exclude welcome + success
  const currentStepNumber =
    qualifiedIndex > 0 ? Math.min(qualifiedIndex, totalCountedSteps) : 0;
  const progress =
    qualifiedIndex >= 0 ? qualifiedIndex / (QUALIFIED_STEPS.length - 1) : 0;
  const showProgress = !HIDE_PROGRESS_ON.includes(current);
  const showBack = history.length > 1 && current !== "success";

  const render = () => {
    switch (current) {
      case "welcome":
        return <Welcome key="welcome" onNext={() => goTo("email")} />;

      case "email":
        return (
          <Email
            key="email"
            value={state.email}
            onChange={(v) => setState((s) => ({ ...s, email: v }))}
            onNext={() => goTo("gender")}
          />
        );

      case "gender":
        return (
          <Gender
            key="gender"
            value={state.gender}
            onSelect={(g: GenderT) => {
              setState((s) => ({ ...s, gender: g }));
              // Women continue straight to the flow; men get the loved-one
              // branch so we can capture them either way.
              goTo(g === "woman" ? "transition" : "loved-one");
            }}
          />
        );

      case "loved-one":
        return (
          <LovedOne
            key="loved-one"
            onSelect={(v: YesNo) => {
              if (v === "yes") {
                setState((s) => ({ ...s, orderingFor: "loved_one" }));
                goTo("transition");
              } else {
                goTo("men-lead");
              }
            }}
          />
        );

      case "men-lead":
        return (
          <LeadCapture
            key="men-lead"
            heading="We\u2019ll keep you posted."
            body="We\u2019re building something for men. We\u2019ll reach out the moment it\u2019s ready."
            cta="Keep me posted"
            reason="men_waitlist"
            prefilledEmail={state.email || undefined}
          />
        );

      case "transition":
        return (
          <TransitionScreen
            key="transition"
            onDone={() => goTo("symptom-opener")}
          />
        );

      case "symptom-opener":
        return (
          <SymptomOpener
            key="symptom-opener"
            value={state.feelLikeSelf}
            orderingFor={orderingFor}
            onAnswer={(v: FeelLikeSelf) => {
              setState((s) => ({ ...s, feelLikeSelf: v }));
              goTo("symptom-multi");
            }}
          />
        );

      case "symptom-multi":
        return (
          <SymptomMultiSelect
            key="symptom-multi"
            value={state.symptoms}
            otherText={state.otherSymptomText}
            orderingFor={orderingFor}
            onChange={(next: SymptomId[]) =>
              setState((s) => ({ ...s, symptoms: next }))
            }
            onOtherTextChange={(v) =>
              setState((s) => ({ ...s, otherSymptomText: v }))
            }
            onContinue={() => goTo("pivot")}
          />
        );

      case "pivot":
        return (
          <Pivot
            key="pivot"
            orderingFor={orderingFor}
            onNext={() => goTo("device")}
          />
        );

      case "device":
        return (
          <Device
            key="device"
            value={state.device}
            orderingFor={orderingFor}
            onSelect={(d: DeviceT) => {
              setState((s) => ({ ...s, device: d }));
              goTo(d === "iphone" ? "location" : "device-lead");
            }}
          />
        );

      case "device-lead":
        return (
          <LeadCapture
            key="device-lead"
            heading="Android is on our roadmap."
            body="We\u2019ll tell you the moment LERA lands on Android."
            cta="Count me in"
            reason="android"
            prefilledEmail={state.email || undefined}
          />
        );

      case "location":
        return (
          <Location
            key="location"
            value={state.location}
            orderingFor={orderingFor}
            onSelect={(code) => {
              setState((s) => ({ ...s, location: code }));
              // NY/NJ go through the full rich-profile flow, every other state
              // hands over to the early lead capture, international is its own.
              if (code === OUTSIDE_US) goTo("location-lead-intl");
              else if (code === "NY" || code === "NJ") goTo("age");
              else goTo("location-lead-state");
            }}
          />
        );

      case "location-lead-state":
        return (
          <LeadCapture
            key="location-lead-state"
            heading={`We\u2019re not in ${stateName(state.location ?? "")} yet, but we\u2019re coming.`}
            body="We\u2019ll let you know the moment LERA reaches you."
            cta="Count me in"
            reason="location"
            state={state.location}
            prefilledEmail={state.email || undefined}
          />
        );

      case "location-lead-intl":
        return (
          <LeadCapture
            key="location-lead-intl"
            heading="LERA is US-only right now."
            body="We\u2019ll be in touch when we expand internationally."
            cta="Count me in"
            reason="outside_us"
            prefilledEmail={state.email || undefined}
          />
        );

      case "age":
        return (
          <Age
            key="age"
            value={state.age}
            orderingFor={orderingFor}
            onChange={(v) => setState((s) => ({ ...s, age: v }))}
            onNext={() => goTo("insurance")}
          />
        );

      case "insurance":
        return (
          <Insurance
            key="insurance"
            value={state.medicareMedicaid}
            orderingFor={orderingFor}
            onSelect={(v: YesNo) => {
              setState((s) => ({ ...s, medicareMedicaid: v }));
              goTo(v === "yes" ? "insurance-info" : "first-name");
            }}
          />
        );

      case "insurance-info":
        return (
          <InsuranceInfo
            key="insurance-info"
            orderingFor={orderingFor}
            onContinue={() => goTo("first-name")}
            onOptOut={postMedicareLead}
          />
        );

      case "first-name":
        return (
          <FirstName
            key="first-name"
            value={state.firstName}
            orderingFor={orderingFor}
            onChange={(v) => setState((s) => ({ ...s, firstName: v }))}
            onNext={() => goTo("last-name")}
          />
        );

      case "last-name":
        return (
          <LastName
            key="last-name"
            value={state.lastName}
            orderingFor={orderingFor}
            onChange={(v) => setState((s) => ({ ...s, lastName: v }))}
            onNext={submitQualified}
          />
        );

      case "success":
        return (
          <Success
            key="success"
            firstName={state.firstName || "there"}
            orderingFor={orderingFor}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      {showProgress && <ProgressBar value={progress} />}
      {showProgress && currentStepNumber > 0 && (
        <StepCounter step={currentStepNumber} total={totalCountedSteps} />
      )}
      {showBack && <BackButton onClick={back} />}
      <div className="flex flex-1 flex-col">
        {/* initial={false} skips the enter animation on the very first mount
            so the welcome screen shows at rest immediately. Matters if the
            tab loads in the background (rAF throttled) and for reduced-motion. */}
        <AnimatePresence mode="wait" initial={false}>
          {render()}
        </AnimatePresence>
      </div>
    </main>
  );
}
