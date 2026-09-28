"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  /** Total travel in px while the element crosses the viewport (roughly 0.15 to 0.3 of scroll speed). */
  distance?: number;
  className?: string;
  innerClassName?: string;
};

/** Moves its children slower than the page as they cross the viewport. */
export function Parallax({ children, distance = 120, className, innerClassName }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
