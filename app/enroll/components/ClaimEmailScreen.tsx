"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../../pre-screening/components/Screen";
import { TextInput } from "../../pre-screening/components/TextInput";
import { isEmailValid } from "../types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
};

export function ClaimEmailScreen({ value, onChange, onContinue }: Props) {
  const valid = isEmailValid(value);
  return (
    <Screen>
      <ScreenHeading>Claim your spot</ScreenHeading>
      <ScreenSub>Confirm the email you used to join the waitlist.</ScreenSub>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onContinue();
        }}
      >
        <TextInput
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          placeholder="you@example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="mt-8">
          <PrimaryButton type="submit" disabled={!valid}>
            Continue
            <span aria-hidden>&rarr;</span>
          </PrimaryButton>
        </div>
      </form>
    </Screen>
  );
}
