"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../../pre-screening/components/Screen";
import { TextInput } from "../../pre-screening/components/TextInput";
import { isPhoneValid } from "../types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
};

export function PhoneScreen({ value, onChange, onContinue }: Props) {
  const valid = isPhoneValid(value);
  return (
    <Screen>
      <ScreenHeading>What&rsquo;s your mobile number?</ScreenHeading>
      <ScreenSub>We&rsquo;ll use this for care updates and shipping notifications.</ScreenSub>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onContinue();
        }}
      >
        <TextInput
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          autoFocus
          placeholder="(555) 123-4567"
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
