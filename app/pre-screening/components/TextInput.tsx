"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className = "", ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
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
