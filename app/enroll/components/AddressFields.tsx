"use client";

import { TextInput } from "../../pre-screening/components/TextInput";
import type { Address } from "../types";
import { AddressAutocompleteInput } from "./AddressAutocompleteInput";
import { StateSelect } from "./StateSelect";

type Props = {
  value: Address;
  onChange: (next: Address) => void;
  idPrefix: string;
  autoFocus?: boolean;
};

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-forest">
      {children}
    </label>
  );
}

export function AddressFields({ value, onChange, idPrefix, autoFocus }: Props) {
  const set = (patch: Partial<Address>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor={`${idPrefix}-line1`}>Address line 1 *</Label>
        <AddressAutocompleteInput
          id={`${idPrefix}-line1`}
          value={value.line1}
          autoFocus={autoFocus}
          onChange={(line1) => set({ line1 })}
          onSelectAddress={(parsed) => onChange({ ...value, ...parsed })}
        />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-line2`}>Address line 2 (optional)</Label>
        <TextInput
          id={`${idPrefix}-line2`}
          autoComplete="off"
          placeholder="Apt, suite, unit, building"
          value={value.line2}
          onChange={(e) => set({ line2: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-city`}>City *</Label>
          <TextInput
            id={`${idPrefix}-city`}
            autoComplete="off"
            placeholder="City"
            value={value.city}
            onChange={(e) => set({ city: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-state`}>State *</Label>
          <StateSelect
            id={`${idPrefix}-state`}
            value={value.state}
            onChange={(state) => set({ state })}
          />
        </div>
      </div>

      <div className="sm:max-w-[12rem]">
        <Label htmlFor={`${idPrefix}-zip`}>ZIP code *</Label>
        <TextInput
          id={`${idPrefix}-zip`}
          inputMode="numeric"
          autoComplete="off"
          placeholder="12345"
          value={value.zip}
          onChange={(e) => set({ zip: e.target.value })}
        />
      </div>
    </div>
  );
}
