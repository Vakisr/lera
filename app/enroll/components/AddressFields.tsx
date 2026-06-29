"use client";

import { useEffect, useRef } from "react";

import { TextInput } from "../../pre-screening/components/TextInput";
import { loadGoogleMaps, parseAddressComponents } from "../googleMaps";
import type { Address } from "../types";
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

  // Google Places address search. Mounts a PlaceAutocompleteElement above the
  // fields; selecting a suggestion fills them. The fields stay fully editable,
  // and this whole block is skipped when no API key is configured.
  const searchHostRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  valueRef.current = value;
  onChangeRef.current = onChange;

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let element: any = null;

    loadGoogleMaps().then((ok) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = (window as any).google;
      if (
        !ok ||
        cancelled ||
        !searchHostRef.current ||
        !g?.maps?.places?.PlaceAutocompleteElement
      ) {
        return;
      }

      element = new g.maps.places.PlaceAutocompleteElement({
        includedRegionCodes: ["us"],
      });
      element.style.width = "100%";
      searchHostRef.current.appendChild(element);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      element.addEventListener("gmp-select", async (event: any) => {
        try {
          const place = event.placePrediction.toPlace();
          await place.fetchFields({ fields: ["addressComponents"] });
          const parsed = parseAddressComponents(place.addressComponents);
          if (parsed) onChangeRef.current({ ...valueRef.current, ...parsed });
        } catch {
          // Ignore lookup failures — manual entry still works.
        }
      });
    });

    return () => {
      cancelled = true;
      if (element && typeof element.remove === "function") element.remove();
    };
  }, []);

  return (
    <div className="space-y-5">
      <div ref={searchHostRef} className="lera-place-search empty:hidden" />

      <div>
        <Label htmlFor={`${idPrefix}-line1`}>Address line 1 *</Label>
        <TextInput
          id={`${idPrefix}-line1`}
          autoComplete="address-line1"
          autoFocus={autoFocus}
          placeholder="123 Main St"
          value={value.line1}
          onChange={(e) => set({ line1: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-line2`}>Address line 2 (optional)</Label>
        <TextInput
          id={`${idPrefix}-line2`}
          autoComplete="address-line2"
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
            autoComplete="address-level2"
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
          autoComplete="postal-code"
          placeholder="12345"
          value={value.zip}
          onChange={(e) => set({ zip: e.target.value })}
        />
      </div>
    </div>
  );
}
