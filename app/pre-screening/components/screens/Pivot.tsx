"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "../PrimaryButton";
import { Screen } from "../Screen";

const PARAGRAPHS = [
  "These feelings aren’t “just life.” And they aren’t in your head.",
  "Lera looks at the full picture — your hormones, gut, metabolism, and more — to understand what’s actually going on in your body. Then we build a plan that adapts to you.",
  "You’ve been listening to your body. We’ll help you understand what it’s been saying.",
];

type Props = {
  onNext: () => void;
};

export function Pivot({ onNext }: Props) {
  return (
    <Screen>
      <div className="space-y-6 text-lg leading-relaxed text-forest/90 sm:text-xl">
        {PARAGRAPHS.map((p, i) => (
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
        transition={{ delay: 0.25 + PARAGRAPHS.length * 0.2, duration: 0.3 }}
        className="mt-10"
      >
        <PrimaryButton onClick={onNext} autoFocus>
          I&rsquo;d like to try it
        </PrimaryButton>
      </motion.div>
    </Screen>
  );
}
