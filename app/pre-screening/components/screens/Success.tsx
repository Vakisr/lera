"use client";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";
import type { OrderingFor } from "../../types";

type Props = {
  firstName: string;
  orderingFor: OrderingFor;
};

// Stripe Checkout session for the qualified-lead handoff. Hardcoded for now.
// Move to an env var once we have a real price/test split.
const STRIPE_CHECKOUT_URL =
  "https://checkout.stripe.com/c/pay/cs_test_b1EbFMC4xkJiV7wr0d4B6SumzlbglruLHCvaDTuJ2phiYPeE9Jg6Zk5VVI#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JwZGZkaGppYFNkd2xka3EnPydmamtxd2ppJyknZHVsTmB8Jz8ndW5acWB2cVowNFdNbWZmN1BETnUwTkFcaDJvXHY0cnRWdW1fXDBRT3BXazJ8cGhwVndBdjZ2UkRicVFhaTZ3Sjd%2Fd0lTV3ZEZjdAc2EzZmRtXWYxTX90PTdDSk9HXUd2MDU1MHB1aktjSDQnKSdjd2poVmB3c2B3Jz9xd3BgKSdnZGZuYndqcGthRmppancnPycmNGQ2YDdjJyknaWR8anBxUXx1YCc%2FJ2hwaXFsWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl";

const UPFRONT = [
  "At-home hormone testing (saliva)",
  "At-home gut health testing",
  "Comprehensive blood panel at a lab near you",
];

const MONTHLY = [
  "Full clinical analysis of your results",
  "Your personalized, whole-body health plan",
  "Your AI health coach, trained on your data",
  "Daily check-ins and ongoing refinements as your body changes",
  "Expert-led content, workshops, and community access",
];

export function Success({ firstName, orderingFor }: Props) {
  const goToCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  const heading =
    orderingFor === "loved_one"
      ? `Thanks for looking out for ${firstName}.`
      : `Thanks for taking ownership of how you feel, ${firstName}.`;

  return (
    <Screen center={false} wide>
      <ScreenHeading>{heading}</ScreenHeading>

      <p className="mt-8 text-lg text-forest/80">Here&rsquo;s what your membership includes:</p>

      <Section
        label="What\u2019s included in your $549 upfront"
        items={UPFRONT}
      />
      <Section label="What\u2019s included in your $29/month" items={MONTHLY} />

      <p className="mt-8 text-sm text-forest/60">
        $549 upfront, then $29/month for 12 months. FSA/HSA eligible.
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

function Section({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-base uppercase tracking-[0.15em] text-leaf-600">
        {label}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-base text-forest/90 sm:text-lg"
          >
            <span aria-hidden className="mt-0.5 text-leaf-600">
              &rarr;
            </span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
