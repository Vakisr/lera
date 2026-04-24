"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "../PrimaryButton";
import { Screen } from "../Screen";
import type { OrderingFor } from "../../types";

const SELF_PARAGRAPHS = [
  "These feelings aren't \u201Cjust life.\u201D And they aren't in your head.",
  "LERA runs a full biomarker diagnostic designed specifically for women to understand what's actually happening in your body. We use this data to build a plan that adapts to you.",
  "You've been listening to your body. We'll help you understand what it's been saying.",
];

const LOVED_ONE_PARAGRAPHS = [
  "These feelings aren't \u201Cjust life.\u201D And they aren't in her head.",
  "LERA runs a full biomarker diagnostic designed specifically for women to understand what's actually happening in her body. We use this data to build a plan that adapts to her.",
  "She's been listening to her body. We'll help her understand what it's been saying.",
];

type Props = {
  onNext: () => void;
  orderingFor: OrderingFor;
};

export function Pivot({ onNext, orderingFor }: Props) {
  const paragraphs =
    orderingFor === "loved_one" ? LOVED_ONE_PARAGRAPHS : SELF_PARAGRAPHS;

  return (
    <Screen>
      <div className="space-y-6 text-lg leading-relaxed text-forest/90 sm:text-xl">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.25 + i * 0.2,
            }}
          >
            {p}
          </motion.p>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 + paragraphs.length * 0.2, duration: 0.3 }}
        className="mt-10"
      >
        <PrimaryButton onClick={onNext} autoFocus>
          I&rsquo;d like to try it
        </PrimaryButton>
      </motion.div>
    </Screen>
  );
}
