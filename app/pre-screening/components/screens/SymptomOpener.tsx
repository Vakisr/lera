"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading } from "../Screen";
import type { FeelLikeSelf, OrderingFor } from "../../types";

type Props = {
  value?: FeelLikeSelf;
  onAnswer: (v: FeelLikeSelf) => void;
  orderingFor: OrderingFor;
};

export function SymptomOpener({ value, onAnswer, orderingFor }: Props) {
  const heading =
    orderingFor === "loved_one"
      ? "Does she feel like herself lately?"
      : "Do you feel like yourself lately?";

  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
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
