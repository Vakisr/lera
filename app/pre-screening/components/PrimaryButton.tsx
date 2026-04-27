"use client";

import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  /** Show an Enter-key hint badge on the leading edge. Defaults to true on primary. */
  enterHint?: boolean;
};

export function PrimaryButton({
  variant = "primary",
  className = "",
  children,
  enterHint,
  ...rest
}: Props) {
  const showHint = enterHint ?? variant === "primary";
  const base =
    "inline-flex min-h-[56px] items-center justify-center gap-3 rounded-pill px-7 py-3 text-base font-medium transition disabled:cursor-not-allowed disabled:opacity-40";
  const styles =
    variant === "primary"
      ? "bg-leaf-600 text-forest hover:bg-leaf-600/90"
      : "bg-transparent text-forest hover:bg-forest/5";
  return (
    <button
      {...rest}
      data-primary-action={variant === "primary" ? "true" : undefined}
      className={`${base} ${styles} ${className}`}
    >
      {showHint && variant === "primary" ? <EnterBadge /> : null}
      <span>{children}</span>
    </button>
  );
}

function EnterBadge() {
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 items-center justify-center rounded-md border border-forest/20 bg-forest/10 text-forest"
    >
      {/* carriage return / enter glyph */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 7v4a3 3 0 0 1-3 3H6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 10l-4 4 4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
