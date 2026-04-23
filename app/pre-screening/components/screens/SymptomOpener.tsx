"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading } from "../Screen";
import type { FeelLikeSelf } from "../../types";

type Props = {
  value?: FeelLikeSelf;
  onAnswer: (v: FeelLikeSelf) => void;
};

export function SymptomOpener({ value, onAnswer }: Props) {
  return (
    <Screen>
      <ScreenHeading>Do you feel like yourself lately?</ScreenHeading>
      <div className="mt-10">
        <ChoiceButtons<FeelLikeSelf>
          value={value}
          onSelect={onAnswer}
          options={[
            { value: "yes", label: "Yes" },
            { value: "not_quite", label: "Not quite" },
            { value: "no", label: "No" },
          ]}
        />
      </div>
    </Screen>
  );
}
