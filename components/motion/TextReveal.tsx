"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type TextRevealProps = {
  text?: string;
  /** Force line breaks: each string is rendered as its own block. */
  lines?: readonly string[];
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /**
   * Controlled mode. When set, the reveal is driven by this value instead of the viewport,
   * which lets the hero wait for the preloader.
   */
  animate?: "hidden" | "visible";
  amount?: number;
  once?: boolean;
  id?: string;
};

const wordVariants = {
  hidden: { y: "115%" },
  visible: { y: "0%" },
};

/**
 * Splits text into words and rises each one out of a clip mask,
 * so headlines "arrive" rather than fade.
 */
export function TextReveal({
  text,
  lines,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  animate,
  amount = 0.3,
  once = true,
  id,
}: TextRevealProps) {
  const Comp = motion[as] as typeof motion.h2;
  const allLines = lines ?? [text ?? ""];
  const label = allLines.join(" ");
  const controlled = animate !== undefined;
  let wordIndex = 0;

  return (
    <Comp
      id={id}
      className={className}
      aria-label={label}
      initial="hidden"
      {...(controlled ? { animate } : { whileInView: "visible", viewport: { once, amount } })}
    >
      {allLines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <span key={lineIndex} className="block">
            {words.map((word, i) => {
              const index = wordIndex++;
              return (
                <Fragment key={i}>
                  <span aria-hidden className="inline-block [clip-path:inset(-0.25em_0_-0.15em_0)]">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={wordVariants}
                      transition={{ duration, ease: EASE, delay: delay + index * stagger }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Comp>
  );
}
