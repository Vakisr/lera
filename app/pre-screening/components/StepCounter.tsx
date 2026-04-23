"use client";

type Props = {
  step: number;
  total: number;
};

export function StepCounter({ step, total }: Props) {
  return (
    <div
      aria-live="polite"
      className="fixed right-4 top-4 z-40 select-none rounded-pill bg-cream/80 px-3 py-1.5 text-xs font-medium tabular-nums text-forest/70 shadow-soft backdrop-blur sm:right-6 sm:top-6"
    >
      <span className="text-forest">{step}</span>
      <span className="mx-1 text-forest/40">/</span>
      <span>{total}</span>
    </div>
  );
}
