"use client";

import { PrimaryButton } from "../../pre-screening/components/PrimaryButton";
import { Screen } from "../../pre-screening/components/Screen";
import { AgreementBody } from "../AgreementBody";
import { agreementToPlainText, type Agreement } from "../agreements";
import { Checkbox } from "./Checkbox";

type Props = {
  agreement: Agreement;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onContinue: () => void;
};

export function AgreementScreen({ agreement, checked, onChange, onContinue }: Props) {
  const downloadDocument = () => {
    const blob = new Blob([agreementToPlainText(agreement)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LERA-${agreement.title.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const reviewDocument = () => {
    window.open(`/enroll/document/${agreement.slug}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Screen center={false} wide>
      <section className="rounded-2xl border border-leaf/30 bg-mint-50 p-5 sm:p-7">
        <header className="flex items-start gap-3">
          <AgreementIcon slug={agreement.slug} />
          <div>
            <h1 className="font-display text-2xl text-forest">{agreement.title}</h1>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              <DocLink onClick={reviewDocument}>Review document</DocLink>
              <DocLink onClick={downloadDocument}>Download document</DocLink>
            </div>
          </div>
        </header>

        <div className="mt-5 max-h-[24rem] overflow-y-auto rounded-xl bg-white p-6 sm:p-8">
          <AgreementBody agreement={agreement} />
        </div>

        <div className="mt-5 border-t border-leaf/20 pt-5">
          <Checkbox checked={checked} onChange={onChange}>
            {agreement.consentLabel}
          </Checkbox>
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <PrimaryButton onClick={onContinue} disabled={!checked} autoFocus>
          Continue
          <span aria-hidden>&rarr;</span>
        </PrimaryButton>
      </div>
    </Screen>
  );
}

function DocLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-base font-medium text-leaf-600 transition hover:text-leaf-600/80"
    >
      {children}
      <span aria-hidden>&#8599;</span>
    </button>
  );
}

function AgreementIcon({ slug }: { slug: string }) {
  if (slug === "telehealth-consent") {
    return (
      <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center text-leaf-600">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
          <path
            d="M6 3v5a4 4 0 0 0 8 0V3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 16v1a5 5 0 0 0 10 0v-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    );
  }
  return (
    <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center text-leaf-600">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 13.5 14.5 18l-2.5.7.7-2.5L17.2 11.7a1.3 1.3 0 0 1 1.8 1.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
