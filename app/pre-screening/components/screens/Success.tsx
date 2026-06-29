"use client";

import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading } from "../Screen";

type Props = {
  firstName: string;
};

// Stripe Checkout session for the qualified-lead handoff. Hardcoded for now.
// Move to an env var once we have a real price/test split.
const STRIPE_CHECKOUT_URL =
  "https://checkout.stripe.com/c/pay/cs_test_b1EbFMC4xkJiV7wr0d4B6SumzlbglruLHCvaDTuJ2phiYPeE9Jg6Zk5VVI#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JwZGZkaGppYFNkd2xka3EnPydmamtxd2ppJyknZHVsTmB8Jz8ndW5acWB2cVowNFdNbWZmN1BETnUwTkFcaDJvXHY0cnRWdW1fXDBRT3BXazJ8cGhwVndBdjZ2UkRicVFhaTZ3Sjd%2Fd0lTV3ZEZjdAc2EzZmRtXWYxTX90PTdDSk9HXUd2MDU1MHB1aktjSDQnKSdjd2poVmB3c2B3Jz9xd3BgKSdnZGZuYndqcGthRmppancnPycmNGQ2YDdjJyknaWR8anBxUXx1YCc%2FJ2hwaXFsWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl";

const TESTING = [
  "Blood testing",
  "Saliva testing",
  "Stool & microbiome testing",
  "Comprehensive health assessment",
  "Personalized health roadmap",
];

const MONTHLY = [
  "Unlimited conversations with LERA",
  "Personalized recommendations that improve over time",
  "Care that adapts through every life stage",
  "Daily support and community access",
  "Progress tracking and symptom monitoring",
];

export function Success({ firstName }: Props) {
  const goToCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  return (
    <Screen center={false} wide>
      <ScreenHeading>Welcome to Lera, {firstName}.</ScreenHeading>

      <p className="mt-6 max-w-xl text-lg text-forest/75">
        Based on what you shared, your testing will look at hormones + gut + metabolism + brain.
      </p>

      <p className="mt-2 max-w-xl text-base text-forest/60">
        Here&rsquo;s what your membership includes.
      </p>

      <div className="mt-10 rounded-2xl border border-forest/10 bg-cream/40 p-8 sm:p-10">
        <Tier name="Initial Assessment & Testing" price="$549 one-time" items={TESTING} />
        <div className="my-8 h-px bg-forest/10" />
        <Tier name="Daily Health Coach" price="$29 / month" items={MONTHLY} />
      </div>

      <p className="mt-6 text-sm text-forest/55">
        $549 one-time, then $29/month. HSA/FSA eligible &mdash; less than $1 a day.
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

function Tier({
  name,
  price,
  items,
}: {
  name: string;
  price: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="font-display text-xl text-forest sm:text-2xl">{name}</h2>
        <span className="text-base text-forest/55">{price}</span>
      </div>
      <ul className="mt-5 space-y-2.5 text-base text-forest/85 sm:text-lg">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
