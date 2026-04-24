"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { YesNo } from "../../types";

type Props = {
  value?: YesNo;
  onSelect: (v: YesNo) => void;
};

export function LovedOne({ value, onSelect }: Props) {
  return (
    <Screen>
      <ScreenHeading>Are you ordering this for a loved one?</ScreenHeading>
      <ScreenSub>
        We&rsquo;re looking into a specific offering for men. Right now LERA is
        only for women.
      </ScreenSub>
      <div className="mt-10">
        <ChoiceButtons<YesNo>
          value={value}
          onSelect={onSelect}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>
    </Screen>
  );
}
