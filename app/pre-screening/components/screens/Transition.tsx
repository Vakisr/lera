"use client";

import { useEffect, useRef } from "react";
import { Screen } from "../Screen";

export function Transition({ onDone }: { onDone: () => void }) {
  // Keep onDone in a ref so the timer fires exactly once on mount, regardless
  // of parent re-renders creating a new callback identity.
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const t = setTimeout(() => doneRef.current(), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen>
      <p className="font-display text-3xl leading-tight text-forest sm:text-4xl">
        A few questions.
        <br />
        <span className="text-forest/60">Just between us.</span>
      </p>
    </Screen>
  );
}
