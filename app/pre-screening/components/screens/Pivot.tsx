"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "../PrimaryButton";
import { Screen } from "../Screen";

const paragraphsSelf = [
  "These feelings aren’t “just life.” And they aren’t in your head.",
  "LERA runs a full biomarker diagnostic designed specifically for women to understand what’s actually happening in your body. We use this data to build a plan that adapts to you.",
  "You’ve been listening to your body. We’ll help you understand what it’s been saying.",
];

const paragraphsHer = [
  "What she’s feeling isn’t “just life.” And it isn’t in her head.",
  "LERA runs a full biomarker diagnostic designed specifically for women to understand what’s actually happening in her body. We use this data to build a plan that adapts to her.",
  "You’ve been listening to her. We’ll help you both understand what her body has been saying.",
];

type Props = {
  onNext: () => void;
  forHer?: boolean;
};

export function Pivot({ onNext, forHer = false }: Props) {
  const paragraphs = forHer ? paragraphsHer : paragraphsSelf;
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
          {forHer ? "Continue for her" : "I’d like to try it"}
        </PrimaryButton>
      </motion.div>
    </Screen>
  );
}
