"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../../pre-screening/components/Screen";
import { isAddressComplete, type Address } from "../types";
import { AddressFields } from "./AddressFields";
import { Checkbox } from "./Checkbox";

type Props = {
  sameAsShipping: boolean;
  onSameAsShippingChange: (value: boolean) => void;
  billing: Address;
  onBillingChange: (next: Address) => void;
  onContinue: () => void;
};

export function BillingAddressScreen({
  sameAsShipping,
  onSameAsShippingChange,
  billing,
  onBillingChange,
  onContinue,
}: Props) {
  const valid = sameAsShipping || isAddressComplete(billing);
  return (
    <Screen center={false} wide>
      <ScreenHeading>What&rsquo;s your billing address?</ScreenHeading>
      <ScreenSub>We&rsquo;ll bill the payment method on the next screen.</ScreenSub>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onContinue();
        }}
      >
        <div className="rounded-2xl border border-forest/10 bg-cream/40 p-5 sm:p-6">
          <Checkbox checked={sameAsShipping} onChange={onSameAsShippingChange}>
            Billing address is the same as shipping
          </Checkbox>
        </div>

        {!sameAsShipping && (
          <div className="mt-6">
            <AddressFields
              value={billing}
              onChange={onBillingChange}
              idPrefix="billing"
              autoFocus
            />
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <PrimaryButton type="submit" disabled={!valid}>
            Continue to payment
            <span aria-hidden>&rarr;</span>
          </PrimaryButton>
        </div>
      </form>
    </Screen>
  );
}
