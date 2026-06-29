"use client";

import { Screen } from "../Screen";

type Props = {
  onStart: () => void;
};

/** Hero landing slide, mirroring the home page. Used as the first slide of the
 *  standalone waitlist flow (which has no home page before it). */
export function Welcome({ onStart }: Props) {
  return (
    <Screen>
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-forest/60">
          LERA Health
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-forest sm:text-6xl">
          Care that finally gets you.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-forest/75">
          Test what matters, understand what&rsquo;s going on, and get a plan that grows
          with you.
        </p>
        <button
          type="button"
          data-primary-action="true"
          autoFocus
          onClick={onStart}
          className="mt-10 inline-flex items-center rounded-pill bg-leaf-600 px-8 py-4 text-base font-medium text-forest transition hover:bg-leaf-600/90"
        >
          See if LERA&rsquo;s a fit
        </button>
        <p className="mt-4 text-sm text-forest/55">This takes about 2 minutes</p>
      </div>
    </Screen>
  );
}
