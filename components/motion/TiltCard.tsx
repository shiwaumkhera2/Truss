"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Lift on hover in px. */
  lift?: number;
  className?: string;
};

/** Subtle 3D tilt that follows the cursor, with a soft lift on hover. */
export function TiltCard({ children, max = 6, lift = 4, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hoverable = useRef(false);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });

  useEffect(() => {
    hoverable.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !hoverable.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * max * 2);
    rotateY.set(px * max * 2);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={reduce ? undefined : { y: -lift }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}
