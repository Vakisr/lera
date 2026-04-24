"use client";

import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import { TextInput } from "../TextInput";

const MIN_AGE = 18;
const MAX_AGE = 99;

type Props = {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
};

export function Age({ value, onChange, onNext }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(String(value));

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.focus();
      el.select();
    }
  }, []);

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const parsed = parseInt(text, 10);
  const valid =
    !Number.isNaN(parsed) && parsed >= MIN_AGE && parsed <= MAX_AGE;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
    setText(raw);
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n >= MIN_AGE && n <= MAX_AGE) onChange(n);
  };

  const handleBlur = () => {
    const n = parseInt(text, 10);
    if (Number.isNaN(n)) {
      setText(String(value));
      return;
    }
    const clamped = Math.max(MIN_AGE, Math.min(MAX_AGE, n));
    setText(String(clamped));
    if (clamped !== value) onChange(clamped);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    ref.current?.blur();
    if (valid) onNext();
  };

  return (
    <Screen>
      <ScreenHeading>How old are you?</ScreenHeading>
      <form className="mt-10 space-y-6" onSubmit={submit}>
        <TextInput
          ref={ref}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          placeholder="Age"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Age"
        />
        <PrimaryButton type="submit" disabled={!valid}>
          Continue
        </PrimaryButton>
      </form>
    </Screen>
  );
}
