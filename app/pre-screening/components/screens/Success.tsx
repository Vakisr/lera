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

const UPFRONT_BULLETS = [
  "At-home hormone testing (saliva)",
  "At-home gut health testing",
  "Comprehensive blood panel at a lab near you",
];

const MONTHLY_BULLETS = [
  "Full clinical analysis of your results",
  "Your personalized, whole-body health plan",
  "Your AI health coach, trained on your data",
  "Daily check-ins and ongoing refinements as your body changes",
  "Expert-led content, workshops and community access",
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
        Here&rsquo;s what your membership includes:
      </p>

      <section className="mt-6">
        <h2 className="text-base font-medium text-forest sm:text-lg">
          What&rsquo;s included in your $549 upfront:
        </h2>
        <ul className="mt-3 space-y-2">
          {UPFRONT_BULLETS.map((b) => (
            <li key={b} className="flex gap-3 text-base text-forest/90 sm:text-lg">
              <span aria-hidden className="mt-0.5 text-leaf-600">
                &rarr;
              </span>
              <span className="flex-1">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-medium text-forest sm:text-lg">
          What&rsquo;s included in your $29/month:
        </h2>
        <ul className="mt-3 space-y-2">
          {MONTHLY_BULLETS.map((b) => (
            <li key={b} className="flex gap-3 text-base text-forest/90 sm:text-lg">
              <span aria-hidden className="mt-0.5 text-leaf-600">
                &rarr;
              </span>
              <span className="flex-1">{b}</span>
            </li>
          ))}
        </ul>
      </section>

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
