"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

const MIN = 18;
const MAX = 120;

// The number is still colored on a gradient from mint at 18 to forest at 85+,
// but we've dropped the slider because people would rather type their age.
const GRADIENT_STOPS = [
  { age: 18, color: [106, 228, 162] }, // mint
  { age: 35, color: [0, 216, 117] }, // brand leaf
  { age: 55, color: [5, 130, 75] },
  { age: 85, color: [11, 58, 40] }, // deep forest
];

function interpolate(age: number) {
  const clamped = Math.max(MIN, Math.min(GRADIENT_STOPS[GRADIENT_STOPS.length - 1].age, age));
  for (let i = 0; i < GRADIENT_STOPS.length - 1; i++) {
    const a = GRADIENT_STOPS[i];
    const b = GRADIENT_STOPS[i + 1];
    if (clamped >= a.age && clamped <= b.age) {
      const t = (clamped - a.age) / (b.age - a.age);
      const c = a.color.map((v, idx) => Math.round(v + (b.color[idx] - v) * t));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }
  return "rgb(11, 58, 40)";
}

type Props = {
  value: number;
  onChange: (v: number) => void;
  inputRef?: RefObject<HTMLInputElement>;
};

export function AgeInput({ value, onChange, inputRef }: Props) {
  const color = interpolate(value);

  // Local text state so the user can type intermediate values ("8" on the way
  // to "85") without us clamping under them. We commit on blur.
  const [text, setText] = useState(String(value));
  const innerNumRef = useRef<HTMLInputElement>(null);
  const numRef = inputRef ?? innerNumRef;

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
    setText(raw);
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n >= MIN && n <= MAX) onChange(n);
  };

  const handleBlur = () => {
    const n = parseInt(text, 10);
    if (Number.isNaN(n)) {
      setText(String(value));
      return;
    }
    const clamped = Math.max(MIN, Math.min(MAX, n));
    setText(String(clamped));
    if (clamped !== value) onChange(clamped);
  };

  const style = useMemo(() => ({ color }), [color]);

  return (
    <div className="flex items-start justify-center">
      <input
        ref={numRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={3}
        value={text}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onFocus={(e) => e.currentTarget.select()}
        style={style}
        className="w-[4ch] bg-transparent text-center font-display text-[6rem] leading-none tracking-tight outline-none transition-colors duration-150 caret-forest/70"
        aria-label="Age"
      />
    </div>
  );
}
