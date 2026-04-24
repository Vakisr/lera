"use client";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

type Props = {
  onContinue: () => void;
};

export function InsuranceNotice({ onContinue }: Props) {
  return (
    <Screen>
      <ScreenHeading>LERA isn’t covered by Medicare or Medicaid yet.</ScreenHeading>
      <ScreenSub>
        You’re welcome to continue and pay out of pocket. We’ll also let you
        know the moment that changes.
      </ScreenSub>
      <div className="mt-10">
        <PrimaryButton onClick={onContinue} autoFocus>
          Continue
        </PrimaryButton>
      </div>
    </Screen>
  );
}
