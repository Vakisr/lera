"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading } from "../Screen";
import type { Gender as GenderT } from "../../types";

type Props = {
  value?: GenderT;
  onSelect: (g: GenderT) => void;
};

export function Gender({ value, onSelect }: Props) {
  return (
    <Screen>
      <ScreenHeading>LERA was built for women. Is this you?</ScreenHeading>
      <div className="mt-10">
        <ChoiceButtons<GenderT>
          value={value}
          onSelect={onSelect}
          options={[
            { value: "woman", label: "I'm a woman" },
            { value: "not_woman", label: "I'm not" },
          ]}
        />
      </div>
    </Screen>
  );
}
