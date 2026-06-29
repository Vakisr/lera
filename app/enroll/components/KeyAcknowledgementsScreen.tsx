"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen, ScreenHeading } from "../../pre-screening/components/Screen";
import { KEY_ACKNOWLEDGEMENTS } from "../keyAcknowledgements";
import { Checkbox } from "./Checkbox";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onContinue: () => void;
};

export function KeyAcknowledgementsScreen({ checked, onChange, onContinue }: Props) {
  return (
    <Screen center={false} wide>
      <ScreenHeading>Key acknowledgements</ScreenHeading>

      <section className="mt-8 rounded-2xl border border-leaf/30 bg-mint-50 p-5 sm:p-7">
        <ul className="space-y-3">
          {KEY_ACKNOWLEDGEMENTS.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-base leading-relaxed text-forest/85">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-leaf-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-leaf/20 pt-5">
          <Checkbox checked={checked} onChange={onChange}>
            I understand and agree to the above.
          </Checkbox>
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={onContinue} disabled={!checked} autoFocus>
          Continue
          <span aria-hidden>&rarr;</span>
        </PrimaryButton>
      </div>
    </Screen>
  );
}
