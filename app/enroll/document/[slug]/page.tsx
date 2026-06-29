import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AgreementBody } from "../../AgreementBody";
import { AGREEMENTS, getAgreement } from "../../agreements";

export function generateStaticParams() {
  return AGREEMENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agreement = getAgreement(slug);
  return { title: `LERA — ${agreement?.title ?? "Document"}` };
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agreement = getAgreement(slug);

  if (!agreement) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
      <h1 className="font-display text-3xl text-forest sm:text-4xl">
        {agreement.title}
      </h1>
      <div className="mt-6">
        <AgreementBody agreement={agreement} />
      </div>
    </main>
  );
}
