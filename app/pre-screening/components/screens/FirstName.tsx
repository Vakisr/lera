"use client";

import { useEffect, useRef } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import { TextInput } from "../TextInput";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  forHer?: boolean;
};

export function FirstName({ value, onChange, onNext, forHer = false }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const submit = () => {
    if (value.trim()) onNext();
  };

  return (
    <Screen>
      <ScreenHeading>
        {forHer ? "What’s her first name?" : "What’s your first name?"}
      </ScreenHeading>
      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <TextInput
          ref={ref}
          autoComplete={forHer ? "off" : "given-name"}
          placeholder={forHer ? "Her first name" : "First name"}
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
