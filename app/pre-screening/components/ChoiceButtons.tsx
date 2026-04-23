"use client";

import { useEffect, useState } from "react";

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value?: T;
  onSelect: (value: T) => void;
};

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

export function ChoiceButtons<T extends string>({
  options,
  value,
  onSelect,
}: Props<T>) {
  const [pressed, setPressed] = useState<T | undefined>(value);

  const handle = (v: T) => {
    setPressed(v);
    // 150ms delay so the selected state is visibly felt before advancing.
    setTimeout(() => onSelect(v), 150);
  };

  // Keyboard shortcuts: letter keys A..K select the matching option.
  // Skipped when focus is in an editable field so typing still works.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const idx = LETTERS.indexOf(e.key.toUpperCase());
      if (idx < 0 || idx >= options.length) return;
      e.preventDefault();
      handle(options[idx].value);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // handle captures setPressed/onSelect; options changing remounts handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt, i) => {
        const active = pressed === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handle(opt.value)}
            className={[
              "group flex min-h-[64px] w-full items-center gap-4 rounded-xl2 border px-5 py-4 text-left text-lg transition",
              active
                ? "border-forest bg-forest text-cream shadow-soft"
                : "border-forest/15 bg-cream text-forest hover:border-leaf-600 hover:bg-mint-50",
            ].join(" ")}
          >
            <LetterBadge letter={LETTERS[i]} active={active} />
            <span className="flex-1">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function LetterBadge({
  letter,
  active,
}: {
  letter: string;
  active?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={[
        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border text-sm font-medium",
        active
          ? "border-cream/30 bg-cream/15 text-cream"
          : "border-forest/20 bg-cream text-forest/70 group-hover:border-leaf-600 group-hover:text-leaf-600",
      ].join(" ")}
    >
      {letter}
    </span>
  );
}
