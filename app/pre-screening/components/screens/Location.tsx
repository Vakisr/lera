"use client";

import { StateCombobox } from "../StateCombobox";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { OrderingFor } from "../../types";

type Props = {
  value?: string;
  onSelect: (code: string) => void;
  orderingFor: OrderingFor;
};

// Service-area note: LERA ships everywhere *except* NY/NJ today, so the sub
// copy asks warmly without over-promising. NY/NJ still collect the full
// profile and land on the lead list downstream.
export function Location({ value, onSelect, orderingFor }: Props) {
  const heading =
    orderingFor === "loved_one" ? "Where is she based?" : "Where are you based?";
  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
      <ScreenSub>So we know which labs and providers we can connect you with.</ScreenSub>
      <div className="mt-10">
        <StateCombobox value={value} onSelect={onSelect} />
      </div>
    </Screen>
  );
}
