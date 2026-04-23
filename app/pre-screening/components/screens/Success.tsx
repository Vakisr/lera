"use client";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";

type Props = {
  firstName: string;
};

// Stripe Checkout session for the qualified-lead handoff. Hardcoded for now
// because the endpoint is hosted by Stripe and stable across deploys. Move to
// an env var once we have a real price/test split.
const STRIPE_CHECKOUT_URL =
  "https://checkout.stripe.com/c/pay/cs_test_b1EbFMC4xkJiV7wr0d4B6SumzlbglruLHCvaDTuJ2phiYPeE9Jg6Zk5VVI#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JwZGZkaGppYFNkd2xka3EnPydmamtxd2ppJyknZHVsTmB8Jz8ndW5acWB2cVowNFdNbWZmN1BETnUwTkFcaDJvXHY0cnRWdW1fXDBRT3BXazJ8cGhwVndBdjZ2UkRicVFhaTZ3Sjd%2Fd0lTV3ZEZjdAc2EzZmRtXWYxTX90PTdDSk9HXUd2MDU1MHB1aktjSDQnKSdjd2poVmB3c2B3Jz9xd3BgKSdnZGZuYndqcGthRmppancnPycmNGQ2YDdjJyknaWR8anBxUXx1YCc%2FJ2hwaXFsWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl";

const BULLETS = [
  "A whole-body diagnostic to see what\u2019s actually going on",
  "A personalized, clinically-backed plan built from your results",
  "Ongoing nutrition and lifestyle guidance as things shift",
  "Educational content and workshops, whenever you need them",
];

export function Success({ firstName }: Props) {
  const goToCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  return (
    <Screen center={false}>
      <ScreenHeading>
        Thanks for taking ownership of how you feel, {firstName}.
      </ScreenHeading>

      <p className="mt-8 text-lg text-forest/80">
        Here&rsquo;s what you&rsquo;re signing up for:
      </p>

      <ul className="mt-4 space-y-3">
        {BULLETS.map((b) => (
          <li key={b} className="flex gap-3 text-base text-forest/90 sm:text-lg">
            <span aria-hidden className="mt-0.5 text-leaf-600">
              &rarr;
            </span>
            <span className="flex-1">{b}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-base text-forest sm:text-lg">
        <span className="font-medium">$549 upfront, then $29/month for 12 months.</span>{" "}
        <span className="text-forest/60">FSA/HSA eligible.</span>
      </p>

      <div className="mt-10">
        <PrimaryButton onClick={goToCheckout} autoFocus>
          <span className="inline-flex items-center gap-2">
            Continue to checkout
            <span aria-hidden>&rarr;</span>
          </span>
        </PrimaryButton>
      </div>
    </Screen>
  );
}
