"use client";

import type { ReactNode } from "react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

/** Styled checkbox + label, matching the enrollment card style. */
export function Checkbox({ checked, onChange, children }: Props) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-base text-forest">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 flex-none cursor-pointer rounded border-forest/30 text-leaf-600 accent-leaf-600"
      />
      <span>{children}</span>
    </label>
  );
}
