"use client";

import { StateCombobox } from "../StateCombobox";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

type Props = {
  value?: string;
  onSelect: (code: string) => void;
  forHer?: boolean;
};

// Copy note: the original spec's sub ("LERA is live in New York and New Jersey
// today.") was based on an earlier service-area assumption. Current reality is
// the inverse: LERA ships everywhere *except* NY/NJ, so asking warmly without
// calling out excluded states keeps the flow smooth for the 95%+ who qualify,
// while NY/NJ users land softly on the next screen.
export function Location({ value, onSelect, forHer = false }: Props) {
  return (
    <Screen>
      <ScreenHeading>
        {forHer ? "Where is she based?" : "Where are you based?"}
      </ScreenHeading>
      <ScreenSub>
        {forHer ? "So we know where to ship her kit." : "So we know where to meet you."}
      </ScreenSub>
      <div className="mt-10">
        <StateCombobox value={value} onSelect={onSelect} />
      </div>
    </Screen>
  );
}
