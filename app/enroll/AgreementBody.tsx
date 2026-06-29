import type { Agreement, AgreementBlock } from "./agreements";

/** Renders an agreement body (effective date + all blocks). Pure presentational. */
export function AgreementBody({ agreement }: { agreement: Agreement }) {
  return (
    <>
      {agreement.effectiveDate && (
        <p className="text-sm text-forest/55">
          Effective Date: {agreement.effectiveDate}
        </p>
      )}
      <div className="mt-4 space-y-4">
        {agreement.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </>
  );
}

export function Block({ block }: { block: AgreementBlock }) {
  switch (block.kind) {
    case "section":
      return (
        <h2 className="pt-3 font-display text-xl text-forest">
          {block.n}. {block.title}
        </h2>
      );
    case "subheading":
      return <h3 className="font-display text-base text-forest">{block.text}</h3>;
    case "para":
      return <p className="text-base leading-relaxed text-forest/75">{block.text}</p>;
    case "list":
      return (
        <ul className="ml-1 space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-base leading-relaxed text-forest/75">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-leaf-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="rounded-lg bg-mint-100 px-4 py-3 text-base leading-relaxed text-forest">
          <span className="font-semibold">{block.label}:</span> {block.text}
        </p>
      );
    case "callout":
      return (
        <p className="rounded-lg bg-coral-100 px-4 py-3 text-base font-medium leading-relaxed text-forest">
          {block.text}
        </p>
      );
  }
}
