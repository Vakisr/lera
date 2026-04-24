"use client";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

type Props = {
  onContinue: () => void;
  forHer?: boolean;
};

export function InsuranceNotice({ onContinue, forHer = false }: Props) {
  return (
    <Screen>
      <ScreenHeading>LERA isn’t covered by Medicare or Medicaid yet.</ScreenHeading>
      <ScreenSub>
        {forHer
          ? "You’re welcome to continue and pay out of pocket for her. We’ll also let you know the moment that changes."
          : "You’re welcome to continue and pay out of pocket. We’ll also let you know the moment that changes."}
      </ScreenSub>
      <div className="mt-10">
        <PrimaryButton onClick={onContinue} autoFocus>
          Continue
        </PrimaryButton>
      </div>
    </Screen>
  );
}
