"use client";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <Screen>
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-leaf-600">
        LERA Health
      </p>
      <ScreenHeading>A few questions, so we can understand you.</ScreenHeading>
      <ScreenSub>This takes about 2 minutes.</ScreenSub>
      <div className="mt-10">
        <PrimaryButton onClick={onNext} autoFocus>
          Let&apos;s begin
        </PrimaryButton>
      </div>
    </Screen>
  );
}
