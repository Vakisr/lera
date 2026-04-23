"use client";

import { useState } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";

export function GenderReject() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url =
      typeof window !== "undefined" ? window.location.origin : "https://lerahealth.com";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <Screen>
      <ScreenHeading>LERA is for women.</ScreenHeading>
      <ScreenSub>
        Our diagnostics are built around women&apos;s biology. If you know a woman in your
        life who might benefit, we&apos;d love for you to share LERA with her.
      </ScreenSub>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <PrimaryButton onClick={share}>Share LERA</PrimaryButton>
        <PrimaryButton variant="ghost" onClick={() => (window.location.href = "/")}>
          Close
        </PrimaryButton>
      </div>
      <div className="mt-4 h-5 text-sm text-leaf-600" aria-live="polite">
        {copied ? "Link copied to clipboard." : ""}
      </div>
    </Screen>
  );
}
