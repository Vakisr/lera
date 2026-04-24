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
import { GenderReject } from "./components/screens/GenderReject";
import { Insurance } from "./components/screens/Insurance";
import { InsuranceNotice } from "./components/screens/InsuranceNotice";
import { LastName } from "./components/screens/LastName";
import { LeadCapture } from "./components/screens/LeadCapture";
import { Location } from "./components/screens/Location";
import { Pivot } from "./components/screens/Pivot";
import { Success } from "./components/screens/Success";
import { SymptomMultiSelect } from "./components/screens/SymptomMultiSelect";
import { SymptomOpener } from "./components/screens/SymptomOpener";
import { Transition as TransitionScreen } from "./components/screens/Transition";
import { Welcome } from "./components/screens/Welcome";

import {
  HIDE_PROGRESS_ON,
  QUALIFIED_STEPS,
  SOMETHING_ELSE_ID,
  stateName,
  type Device as DeviceT,
  type FeelLikeSelf,
  type Gender as GenderT,
  type PreScreeningPayload,
  type PreScreeningState,
  type StepId,
  type SymptomId,
  type YesNo,
} from "./types";

const initialState: PreScreeningState = {
  symptoms: [],
  symptomOther: "",
  age: 35,
  firstName: "",
  lastName: "",
  email: "",
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

  // Keep a ref of the live history so the popstate handler below can read the
  // latest length without re-binding the listener on every step change.
  const historyRef = useRef(history);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  // Install a single sentinel browser-history entry on mount. When the user
  // hits the browser back button, popstate fires once, we pop exactly ONE
  // internal step, and we re-push the sentinel so we stay on the page.
  // Previously we pushed/popped browser history on every goTo, which made the
  // back button jump multiple steps when the two histories drifted.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.pushState({ lera: true }, "");
    const onPop = () => {
      if (historyRef.current.length > 1) {
        setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
        window.history.pushState({ lera: true }, "");
      }
      // At welcome (length 1): let the browser navigate away naturally.
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Keyboard nav: Esc / ArrowLeft = back, ArrowRight = primary action.
  // Suppressed when the user is typing in a text field or using the slider /
  // combobox, since arrows have native meaning there.
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
        // Click the current screen's primary advance button, if any.
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

  const submitQualified = async () => {
    const includesOther = state.symptoms.includes(SOMETHING_ELSE_ID);
    const other = state.symptomOther.trim();
    const payload: PreScreeningPayload = {
      gender: state.gender!,
      feelLikeSelf: state.feelLikeSelf!,
      symptoms: state.symptoms,
      ...(includesOther && other ? { symptomOther: other } : {}),
      device: state.device!,
      location: state.location!,
      age: state.age,
      medicareMedicaid: state.medicareMedicaid!,
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
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

  // Progress through the qualified path only; non-qualified terminals hide
  // the bar and the counter. We count step 1..totalSteps across the screens
  // between (but not including) welcome and success so the counter lands on
  // "1 / N" the moment the user leaves welcome and "N / N" on the last step.
  const qualifiedIndex = QUALIFIED_STEPS.indexOf(
    current as (typeof QUALIFIED_STEPS)[number],
  );
  const totalCountedSteps = QUALIFIED_STEPS.length - 2; // exclude welcome + success
  const currentStepNumber =
    qualifiedIndex > 0 ? Math.min(qualifiedIndex, totalCountedSteps) : 0;
  const progress =
    qualifiedIndex >= 0 ? qualifiedIndex / (QUALIFIED_STEPS.length - 1) : 0;
  const showProgress = !HIDE_PROGRESS_ON.includes(current);
  const showBack =
    history.length > 1 && current !== "gender-reject" && current !== "success";

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
            onSubmit={() => goTo("gender")}
          />
        );

      case "gender":
        return (
          <Gender
            key="gender"
            value={state.gender}
            onSelect={(g: GenderT) => {
              setState((s) => ({ ...s, gender: g }));
              goTo(g === "woman" ? "transition" : "gender-reject");
            }}
          />
        );

      case "gender-reject":
        return <GenderReject key="gender-reject" />;

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
            onChange={(next: SymptomId[]) =>
              setState((s) => ({ ...s, symptoms: next }))
            }
            otherText={state.symptomOther}
            onOtherTextChange={(v) =>
              setState((s) => ({ ...s, symptomOther: v }))
            }
            onContinue={() => goTo("pivot")}
          />
        );

      case "pivot":
        return <Pivot key="pivot" onNext={() => goTo("device")} />;

      case "device":
        return (
          <Device
            key="device"
            value={state.device}
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
            body="We’ll use the email you gave us to tell you the moment LERA lands on Android."
            cta="Count me in"
            reason="android"
            prefilledEmail={state.email}
          />
        );

      case "location":
        return (
          <Location
            key="location"
            value={state.location}
            onSelect={(code) => {
              setState((s) => ({ ...s, location: code }));
              // Service area: available everywhere (including international)
              // EXCEPT NY and NJ. Only NY/NJ falls out to a lead capture.
              if (code === "NY" || code === "NJ") goTo("location-lead-state");
              else goTo("age");
            }}
          />
        );

      case "location-lead-state":
        return (
          <LeadCapture
            key="location-lead-state"
            heading={`We’re not in ${stateName(state.location ?? "")} yet, but we’re coming.`}
            body="We’ll use the email you gave us to let you know when LERA reaches you."
            cta="Count me in"
            reason="location"
            state={state.location}
            prefilledEmail={state.email}
          />
        );

      case "age":
        return (
          <Age
            key="age"
            value={state.age}
            onChange={(v) => setState((s) => ({ ...s, age: v }))}
            onNext={() => goTo("insurance")}
          />
        );

      case "insurance":
        return (
          <Insurance
            key="insurance"
            value={state.medicareMedicaid}
            onSelect={(v: YesNo) => {
              setState((s) => ({ ...s, medicareMedicaid: v }));
              goTo(v === "yes" ? "insurance-notice" : "first-name");
            }}
          />
        );

      case "insurance-notice":
        return (
          <InsuranceNotice
            key="insurance-notice"
            onContinue={() => goTo("first-name")}
          />
        );

      case "first-name":
        return (
          <FirstName
            key="first-name"
            value={state.firstName}
            onChange={(v) => setState((s) => ({ ...s, firstName: v }))}
            onNext={() => goTo("last-name")}
          />
        );

      case "last-name":
        return (
          <LastName
            key="last-name"
            value={state.lastName}
            onChange={(v) => setState((s) => ({ ...s, lastName: v }))}
            onNext={submitQualified}
          />
        );

      case "success":
        return <Success key="success" firstName={state.firstName || "there"} />;

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
