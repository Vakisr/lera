"use client";

import { US_STATES } from "../../pre-screening/types";

type Props = {
  value: string;
  onChange: (code: string) => void;
  id?: string;
};

/** Native state dropdown populated from the shared US_STATES list. */
export function StateSelect({ value, onChange, id }: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl2 border border-forest/15 bg-cream px-5 py-4 text-lg text-forest focus:border-leaf-600 min-h-[56px]"
    >
      <option value="" disabled>
        Select a state…
      </option>
      {US_STATES.map((s) => (
        <option key={s.code} value={s.code}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
