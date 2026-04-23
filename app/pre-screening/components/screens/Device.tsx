"use client";

import { ChoiceButtons } from "../ChoiceButtons";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { Device as DeviceT } from "../../types";

type Props = {
  value?: DeviceT;
  onSelect: (d: DeviceT) => void;
};

export function Device({ value, onSelect }: Props) {
  return (
    <Screen>
      <ScreenHeading>What phone do you use?</ScreenHeading>
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
