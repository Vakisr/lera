"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading } from "../Screen";
import type { YesNo } from "../../types";

type Props = {
  value?: YesNo;
  onSelect: (v: YesNo) => void;
};

export function Insurance({ value, onSelect }: Props) {
  return (
    <Screen>
      <ScreenHeading>Are you currently on Medicare or Medicaid?</ScreenHeading>
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
