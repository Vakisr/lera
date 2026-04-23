"use client";

import { useEffect, useRef } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import { TextInput } from "../TextInput";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
};

export function LastName({ value, onChange, onNext }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const submit = () => {
    if (value.trim()) onNext();
  };

  return (
    <Screen>
      <ScreenHeading>And your last name?</ScreenHeading>
      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <TextInput
          ref={ref}
          autoComplete="family-name"
          placeholder="Last name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <PrimaryButton type="submit" disabled={!value.trim()}>
          Continue
        </PrimaryButton>
      </form>
    </Screen>
  );
}
