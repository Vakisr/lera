"use client";

import { useEffect, useRef } from "react";
import { LetterBadge } from "../ChoiceButtons";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import { TextInput } from "../TextInput";
import { SOMETHING_ELSE_ID, SYMPTOM_OPTIONS, type SymptomId } from "../../types";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

type Props = {
  value: SymptomId[];
  onChange: (next: SymptomId[]) => void;
  otherText: string;
  onOtherTextChange: (v: string) => void;
  onContinue: () => void;
};

export function SymptomMultiSelect({
  value,
  onChange,
  otherText,
  onOtherTextChange,
  onContinue,
}: Props) {
  const otherRef = useRef<HTMLInputElement>(null);
  const showOther = value.includes(SOMETHING_ELSE_ID);

  const toggle = (id: SymptomId) => {
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  };

  // When "Something else" is freshly selected, drop focus into the text input
  // so users can type immediately without a second click.
  useEffect(() => {
    if (showOther) otherRef.current?.focus();
  }, [showOther]);

  // Keyboard: A..K toggles the matching option, Enter continues.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "Enter") {
        e.preventDefault();
        onContinue();
        return;
      }
      const idx = LETTERS.indexOf(e.key.toUpperCase());
      if (idx < 0 || idx >= SYMPTOM_OPTIONS.length) return;
      e.preventDefault();
      toggle(SYMPTOM_OPTIONS[idx].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // onContinue and value captured via closure; re-bind when they change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onContinue]);

  return (
    <Screen wide>
      <ScreenHeading>Which of these sound familiar?</ScreenHeading>
      <ScreenSub>Pick any that apply.</ScreenSub>

      <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SYMPTOM_OPTIONS.map((opt, i) => {
          const active = value.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              aria-pressed={active}
              className={[
                "group flex min-h-[60px] w-full items-center gap-4 rounded-xl2 border px-5 py-3.5 text-left text-base sm:text-lg transition",
                active
                  ? "border-forest bg-forest text-cream shadow-soft"
                  : "border-forest/15 bg-cream text-forest hover:border-leaf-600 hover:bg-mint-50",
              ].join(" ")}
            >
              <LetterBadge letter={LETTERS[i]} active={active} />
              <span className="flex-1">{opt.label}</span>
              <Checkmark active={active} />
            </button>
          );
        })}
      </div>

      {showOther && (
        <div className="mt-5">
          <TextInput
            ref={otherRef}
            placeholder="Tell us what you’re noticing"
            value={otherText}
            onChange={(e) => onOtherTextChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onContinue();
              }
            }}
            aria-label="Describe your symptom"
          />
        </div>
      )}

      <div className="mt-8 flex items-center gap-4">
        <PrimaryButton onClick={onContinue} autoFocus>
          Continue
        </PrimaryButton>
        <span className="text-sm text-forest/55">
          {value.length === 0
            ? "Press a letter, tap, or continue"
            : `${value.length} selected`}
        </span>
      </div>
    </Screen>
  );
}

function Checkmark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition",
        active ? "bg-leaf-600 text-forest" : "bg-transparent text-transparent",
      ].join(" ")}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5L10 17.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
