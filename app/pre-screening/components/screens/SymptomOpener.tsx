"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading } from "../Screen";
import type { FeelLikeSelf } from "../../types";

type Props = {
  value?: FeelLikeSelf;
  onAnswer: (v: FeelLikeSelf) => void;
  forHer?: boolean;
};

export function SymptomOpener({ value, onAnswer, forHer = false }: Props) {
  return (
    <Screen>
      <ScreenHeading>
        {forHer
          ? "Does she feel like herself lately?"
          : "Do you feel like yourself lately?"}
      </ScreenHeading>
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
