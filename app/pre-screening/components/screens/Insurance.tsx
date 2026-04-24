"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading } from "../Screen";
import type { YesNo } from "../../types";

type Props = {
  value?: YesNo;
  onSelect: (v: YesNo) => void;
  forHer?: boolean;
};

export function Insurance({ value, onSelect, forHer = false }: Props) {
  return (
    <Screen>
      <ScreenHeading>
        {forHer
          ? "Is she currently on Medicare or Medicaid?"
          : "Are you currently on Medicare or Medicaid?"}
      </ScreenHeading>
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
