"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

const MIN = 18;
const MAX = 85;

// Soft mint at 18 → vivid LERA green (#00D875) mid-life → deep forest at 85+.
const GRADIENT_STOPS = [
  { age: 18, color: [195, 240, 212] }, // soft mint
  { age: 35, color: [106, 228, 162] },
  { age: 55, color: [0, 216, 117] }, // #00D875, brand green
  { age: 70, color: [5, 130, 75] },
  { age: 85, color: [11, 58, 40] }, // deep forest
];

function interpolate(age: number) {
  const clamped = Math.max(MIN, Math.min(MAX, age));
  for (let i = 0; i < GRADIENT_STOPS.length - 1; i++) {
    const a = GRADIENT_STOPS[i];
    const b = GRADIENT_STOPS[i + 1];
    if (clamped >= a.age && clamped <= b.age) {
      const t = (clamped - a.age) / (b.age - a.age);
      const c = a.color.map((v, idx) => Math.round(v + (b.color[idx] - v) * t));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }
  return "rgb(29,147,77)";
}

type Props = {
  value: number;
  onChange: (v: number) => void;
  /** Forwarded to the numeric age input so callers can focus/select it. */
  inputRef?: RefObject<HTMLInputElement>;
};

export function AgeSlider({ value, onChange, inputRef }: Props) {
  const pct = ((value - MIN) / (MAX - MIN)) * 100;
  const thumbColor = interpolate(value);

  // Local text state so users can type intermediate values ("8" on the way
  // to "85") without the slider fighting them. We only push up to `onChange`
  // when the text is in range; on blur we clamp/repair.
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

  const trackBackground = useMemo(() => {
    // Filled portion runs mint → current thumb color; unfilled tail is soft mint rest.
    return `linear-gradient(to right, rgb(195,240,212) 0%, ${thumbColor} ${pct}%, #DCF7E7 ${pct}%, #DCF7E7 100%)`;
  }, [pct, thumbColor]);

  return (
    <div>
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
          style={{ color: thumbColor }}
          className="w-[3ch] bg-transparent text-center font-display text-[5rem] leading-none tracking-tight outline-none transition-colors duration-150 caret-forest/70"
          aria-label="Age"
        />
        {text === String(MAX) && (
          <span
            aria-hidden
            className="ml-1 align-top font-display text-[3rem] leading-none transition-colors"
            style={{ color: thumbColor }}
          >
            +
          </span>
        )}
      </div>

      <div
        className="mt-10 px-2"
        style={
          {
            ["--slider-track" as string]: trackBackground,
            ["--slider-thumb" as string]: thumbColor,
          } as React.CSSProperties
        }
      >
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="lera-slider"
          aria-label="Age slider"
        />
        <div className="mt-3 flex justify-between text-sm text-forest/55">
          <span>18</span>
          <span>85+</span>
        </div>
      </div>
    </div>
  );
}
