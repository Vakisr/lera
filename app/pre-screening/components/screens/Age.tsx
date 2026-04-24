"use client";

import { useEffect, useRef } from "react";
import { AgeInput } from "../AgeInput";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import type { OrderingFor } from "../../types";

type Props = {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
  orderingFor: OrderingFor;
};

export function Age({ value, onChange, onNext, orderingFor }: Props) {
  const ageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = ageInputRef.current;
    if (el) {
      el.focus();
      el.select();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        ageInputRef.current?.blur();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext]);

  const heading =
    orderingFor === "loved_one" ? "How old is she?" : "How old are you?";

  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
      <div className="mt-12">
        <AgeInput value={value} onChange={onChange} inputRef={ageInputRef} />
      </div>
      <div className="mt-12">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </Screen>
  );
}
