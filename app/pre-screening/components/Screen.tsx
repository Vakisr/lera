"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** When true, content is centered vertically. Default true. */
  center?: boolean;
  /** Use a wider inner column. Useful for multi-column option grids. */
  wide?: boolean;
};

export function Screen({ children, center = true, wide = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full flex-1 flex-col ${center ? "justify-center" : "justify-start pt-12"} px-6 py-10 sm:px-10`}
    >
      <div className={`mx-auto w-full ${wide ? "max-w-3xl" : "max-w-xl"}`}>
        {children}
      </div>
    </motion.div>
  );
}

export function ScreenHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-[2.1rem] leading-[1.12] text-forest sm:text-[2.75rem]">
      {children}
    </h1>
  );
}

export function ScreenSub({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-base text-forest/65 sm:text-lg">{children}</p>;
}
