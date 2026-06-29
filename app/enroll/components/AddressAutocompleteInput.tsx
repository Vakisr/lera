"use client";

import { useEffect, useRef, useState } from "react";

import { TextInput } from "../../pre-screening/components/TextInput";
import { loadGoogleMaps, parseAddressComponents, type ParsedAddress } from "../googleMaps";

type Suggestion = {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prediction: any;
};

type Props = {
  id: string;
  value: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onSelectAddress: (parsed: ParsedAddress) => void;
};

/** Address line 1 input with Google Places (new API) suggestions in a styled
 *  dropdown. Selecting a suggestion fills the rest of the address. Falls back to
 *  a plain input when no API key is configured. */
export function AddressAutocompleteInput({
  id,
  value,
  autoFocus,
  onChange,
  onSelectAddress,
}: Props) {
  const [ready, setReady] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seqRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps().then((ok) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = (window as any).google;
      if (!ok || cancelled || !g?.maps?.places?.AutocompleteSuggestion) return;
      tokenRef.current = new g.maps.places.AutocompleteSessionToken();
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const fetchSuggestions = (input: string) => {
    if (!ready || input.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google;
    const seq = ++seqRef.current;
    g.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
      input,
      includedRegionCodes: ["us"],
      sessionToken: tokenRef.current,
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (seq !== seqRef.current) return; // a newer request superseded this
        const list: Suggestion[] = (res.suggestions ?? [])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((s: any) => s.placePrediction)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((s: any) => ({
            id: s.placePrediction.placeId,
            label: s.placePrediction.text?.text ?? "",
            prediction: s.placePrediction,
          }));
        setSuggestions(list);
        setOpen(list.length > 0);
        setHighlight(0);
      })
      .catch(() => {
        /* ignore lookup errors — manual entry still works */
      });
  };

  const onInput = (v: string) => {
    onChange(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 180);
  };

  const pick = async (s: Suggestion) => {
    setOpen(false);
    setSuggestions([]);
    try {
      const place = s.prediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents"] });
      const parsed = parseAddressComponents(place.addressComponents);
      if (parsed) onSelectAddress(parsed);
    } catch {
      /* ignore */
    }
    // Start a fresh billing session for the next search.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google;
    if (g?.maps?.places) tokenRef.current = new g.maps.places.AutocompleteSessionToken();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(suggestions.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      // Pick the highlighted suggestion instead of submitting the form.
      e.preventDefault();
      const chosen = suggestions[highlight];
      if (chosen) pick(chosen);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <TextInput
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="address-line1"
        autoFocus={autoFocus}
        placeholder="123 Main St"
        value={value}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
      />
      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl2 border border-forest/10 bg-cream shadow-soft"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.id || i}
              role="option"
              aria-selected={i === highlight}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(s);
              }}
              className={[
                "cursor-pointer px-5 py-3 text-base",
                i === highlight
                  ? "bg-mint-50 text-forest"
                  : "text-forest/80 hover:bg-mint-50",
              ].join(" ")}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
