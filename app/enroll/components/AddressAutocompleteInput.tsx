"use client";

import { useEffect, useRef, useState } from "react";

import { TextInput } from "../../pre-screening/components/TextInput";
import type { ParsedAddress } from "../parseAddress";

type Suggestion = { placeId: string; label: string };

type Props = {
  id: string;
  value: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onSelectAddress: (parsed: ParsedAddress) => void;
};

/** Address line 1 input with Google Places suggestions, fetched through our
 *  server-side proxy (/api/places/*) so the API key never reaches the browser.
 *  Degrades to a plain input if the proxy returns nothing. */
export function AddressAutocompleteInput({
  id,
  value,
  autoFocus,
  onChange,
  onSelectAddress,
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const sessionRef = useRef<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seqRef = useRef(0);

  const newSession = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Math.random()).slice(2));

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const fetchSuggestions = async (input: string) => {
    if (input.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (!sessionRef.current) sessionRef.current = newSession();
    const seq = ++seqRef.current;
    try {
      const res = await fetch("/api/places/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, sessionToken: sessionRef.current }),
      });
      const data = (await res.json()) as { suggestions?: Suggestion[] };
      if (seq !== seqRef.current) return; // superseded by a newer keystroke
      const list = data.suggestions ?? [];
      setSuggestions(list);
      setOpen(list.length > 0);
      setHighlight(0);
    } catch {
      /* ignore — manual entry still works */
    }
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
      const res = await fetch("/api/places/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId: s.placeId, sessionToken: sessionRef.current }),
      });
      const data = (await res.json()) as { address?: ParsedAddress | null };
      if (data.address) onSelectAddress(data.address);
    } catch {
      /* ignore */
    }
    sessionRef.current = null; // end the billing session
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
        name="lera-address-search"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
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
              key={s.placeId || i}
              role="option"
              aria-selected={i === highlight}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(s);
              }}
              className={[
                "cursor-pointer px-5 py-3 text-base",
                i === highlight ? "bg-mint-50 text-forest" : "text-forest/80 hover:bg-mint-50",
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
