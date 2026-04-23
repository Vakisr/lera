import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-forest/60">LERA Health</p>
      <h1 className="font-display text-5xl leading-[1.05] text-forest sm:text-6xl">
        By women, for women.
        <br />
        <span className="text-leaf-600">For a lifetime.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-forest/75">
        Whole-body diagnostics and longitudinal care, built around your biology.
      </p>
      <Link
        href="/pre-screening"
        className="mt-10 inline-flex items-center rounded-pill bg-forest px-8 py-4 text-base font-medium text-cream transition hover:bg-forest-800"
      >
        Get started
      </Link>
    </main>
  );
}
