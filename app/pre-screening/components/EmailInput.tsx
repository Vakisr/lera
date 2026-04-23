"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const EmailInput = forwardRef<HTMLInputElement, Props>(function EmailInput(
  { className = "", ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type="email"
      inputMode="email"
      autoComplete="email"
      spellCheck={false}
      className={[
        "w-full rounded-xl2 border border-forest/15 bg-cream px-5 py-4 text-lg text-forest",
        "placeholder:text-forest/30 focus:border-leaf-600",
        "min-h-[56px]",
        className,
      ].join(" ")}
      {...rest}
    />
  );
});

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
