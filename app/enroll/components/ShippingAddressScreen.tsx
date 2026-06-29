"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../../pre-screening/components/Screen";
import { isAddressComplete, type Address } from "../types";
import { AddressFields } from "./AddressFields";

type Props = {
  value: Address;
  onChange: (next: Address) => void;
  onContinue: () => void;
};

export function ShippingAddressScreen({ value, onChange, onContinue }: Props) {
  const valid = isAddressComplete(value);
  return (
    <Screen center={false} wide>
      <ScreenHeading>Where should we ship your kits?</ScreenHeading>
      <ScreenSub>We&rsquo;ll send your testing kits to this address.</ScreenSub>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onContinue();
        }}
      >
        <AddressFields value={value} onChange={onChange} idPrefix="shipping" autoFocus />
        <div className="mt-8 flex justify-end">
          <PrimaryButton type="submit" disabled={!valid}>
            Continue
            <span aria-hidden>&rarr;</span>
          </PrimaryButton>
        </div>
      </form>
    </Screen>
  );
}
