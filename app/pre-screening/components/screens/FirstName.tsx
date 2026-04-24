"use client";

import { useEffect, useRef } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import { TextInput } from "../TextInput";
import type { OrderingFor } from "../../types";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  orderingFor: OrderingFor;
};

export function FirstName({ value, onChange, onNext, orderingFor }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const submit = () => {
    if (value.trim()) onNext();
  };

  const heading =
    orderingFor === "loved_one"
      ? "What\u2019s her first name?"
      : "What\u2019s your first name?";

  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <TextInput
          ref={ref}
          autoComplete={orderingFor === "loved_one" ? "off" : "given-name"}
          placeholder="First name"
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
