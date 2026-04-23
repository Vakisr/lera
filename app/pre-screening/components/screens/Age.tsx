"use client";

import { useEffect, useRef } from "react";
import { AgeSlider } from "../AgeSlider";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";

type Props = {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
};

export function Age({ value, onChange, onNext }: Props) {
  const ageInputRef = useRef<HTMLInputElement>(null);

  // Autofocus + select the age field so users can type over the default or
  // arrow-key through the slider via Tab.
  useEffect(() => {
    const el = ageInputRef.current;
    if (el) {
      el.focus();
      el.select();
    }
  }, []);

  // Enter advances from anywhere on this screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        // Commit any partial text by blurring first, so the parent
        // sees the final clamped value before we navigate away.
        ageInputRef.current?.blur();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext]);

  return (
    <Screen>
      <ScreenHeading>How old are you?</ScreenHeading>
      <p className="mt-3 text-sm text-forest/55">
        Type a number or use the slider.
      </p>
      <div className="mt-10">
        <AgeSlider value={value} onChange={onChange} inputRef={ageInputRef} />
      </div>
      <div className="mt-12">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </Screen>
  );
}
