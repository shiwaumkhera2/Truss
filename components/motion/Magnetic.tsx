"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { clamp, cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  /** How strongly the element follows the cursor (0 to 1). */
  strength?: number;
  /** Maximum travel in px. */
  max?: number;
  className?: string;
};

/** Lets an element drift a few pixels toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.28, max = 8, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hoverable = useRef(false);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.3 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.3 });

  useEffect(() => {
    hoverable.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !hoverable.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mx.set(clamp(dx * strength, -max, max));
    my.set(clamp(dy * strength, -max, max));
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
