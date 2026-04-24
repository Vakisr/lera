"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { Device as DeviceT, OrderingFor } from "../../types";

type Props = {
  value?: DeviceT;
  onSelect: (d: DeviceT) => void;
  orderingFor: OrderingFor;
};

export function Device({ value, onSelect, orderingFor }: Props) {
  const heading =
    orderingFor === "loved_one" ? "What phone does she use?" : "What phone do you use?";
  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
      <ScreenSub>LERA is on iPhone today. Android is on the way.</ScreenSub>
      <div className="mt-10">
        <ChoiceButtons<DeviceT>
          value={value}
          onSelect={onSelect}
          options={[
            { value: "iphone", label: "iPhone" },
            { value: "android", label: "Android" },
          ]}
        />
      </div>
    </Screen>
  );
}
