"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OUTSIDE_US, US_STATES } from "../types";

type Option = { code: string; name: string };

const OPTIONS: Option[] = [
  { code: OUTSIDE_US, name: "I live outside the US" },
  ...US_STATES,
];

type Props = {
  value?: string;
  onSelect: (code: string) => void;
};

export function StateCombobox({ value, onSelect }: Props) {
  const [query, setQuery] = useState(() =>
    value ? OPTIONS.find((o) => o.code === value)?.name ?? "" : "",
  );
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OPTIONS;
    return OPTIONS.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.code.toLowerCase().startsWith(q),
    );
  }, [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Autofocus on mount so users can start typing immediately.
  // A small rAF delay lets framer-motion's enter animation settle first;
  // without it the focus can get lost as AnimatePresence completes.
  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    const raf = requestAnimationFrame(focus);
    const t = setTimeout(focus, 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  // Keep highlighted item in view when navigating with arrow keys.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !open) return;
    const item = list.children[highlight] as HTMLElement | undefined;
    if (item) {
      const top = item.offsetTop;
      const bottom = top + item.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight)
        list.scrollTop = bottom - list.clientHeight;
    }
  }, [highlight, open]);

  const pick = (opt: Option) => {
    setQuery(opt.name);
    setOpen(false);
    onSelect(opt.code);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(filtered.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = filtered[highlight];
      if (chosen) pick(chosen);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        ref={inputRef}
        autoFocus
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls="state-listbox"
        autoComplete="off"
        spellCheck={false}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Start typing your state…"
        className="w-full rounded-xl2 border border-forest/15 bg-cream px-5 py-4 text-lg text-forest placeholder:text-forest/30 focus:border-leaf-600 min-h-[56px]"
      />
      {open && filtered.length > 0 && (
        <ul
          id="state-listbox"
          ref={listRef}
          role="listbox"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl2 border border-forest/10 bg-cream shadow-soft"
        >
          {filtered.map((opt, i) => {
            const active = i === highlight;
            return (
              <li
                key={opt.code}
                role="option"
                aria-selected={active}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(opt);
                }}
                className={[
                  "cursor-pointer px-5 py-3 text-base",
                  active
                    ? "bg-mint-50 text-forest"
                    : "text-forest/80 hover:bg-mint-50",
                ].join(" ")}
              >
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
