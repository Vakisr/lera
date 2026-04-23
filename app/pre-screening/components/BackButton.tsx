"use client";

type Props = {
  onClick: () => void;
};

export function BackButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="fixed left-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-pill bg-cream/80 text-forest shadow-soft backdrop-blur transition hover:bg-cream sm:left-6 sm:top-6"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
