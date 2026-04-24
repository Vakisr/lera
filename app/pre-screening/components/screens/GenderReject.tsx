"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { YesNo } from "../../types";

type Props = {
  onAnswer: (v: YesNo) => void;
};

export function GenderReject({ onAnswer }: Props) {
  return (
    <Screen>
      <ScreenHeading>LERA is built for women today.</ScreenHeading>
      <ScreenSub>
        We&rsquo;re working on a specific offering for men, but right now it&rsquo;s
        only for women.
      </ScreenSub>
      <p className="mt-8 text-lg text-forest sm:text-xl">
        Are you ordering this for a loved one?
      </p>
      <div className="mt-6">
        <ChoiceButtons<YesNo>
          onSelect={onAnswer}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>
    </Screen>
  );
}
