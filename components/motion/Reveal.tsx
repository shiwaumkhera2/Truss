"use client";

import { motion, type Variants } from "framer-motion";
import { EASE, REVEAL_DISTANCE, REVEAL_DURATION } from "@/lib/motion";

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
  span: motion.span,
  figure: motion.figure,
} as const;

type Tag = keyof typeof tags;

export const revealItem: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: EASE } },
};

type RevealProps = {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
  /** Delay before this element (and its children) start, in seconds. */
  delay?: number;
  /** Gap between nested <RevealItem> children, in seconds. */
  stagger?: number;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
  once?: boolean;
  id?: string;
};

/**
 * Fades and rises an element 24px as it enters the viewport.
 * Nested <RevealItem> elements inherit the trigger and stagger in sequence.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  stagger = 0.08,
  amount = 0.2,
  once = true,
  id,
}: RevealProps) {
  const Comp = tags[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y: REVEAL_DISTANCE },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: REVEAL_DURATION,
        ease: EASE,
        delay,
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <Comp
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
};

/** A child of <Reveal> that participates in its stagger. */
export function RevealItem({ children, as = "div", className }: RevealItemProps) {
  const Comp = tags[as] as typeof motion.div;
  return (
    <Comp className={className} variants={revealItem}>
      {children}
    </Comp>
  );
}
