"use client";

import { motion } from "framer-motion";

/** A hairline with a lime segment that keeps travelling downward. */
export function ScrollCue() {
  return (
    <div aria-hidden className="relative h-14 w-px overflow-hidden bg-white/15">
      <motion.span
        className="absolute left-0 top-0 h-5 w-px bg-lime"
        animate={{ y: ["-100%", "300%"] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.5, ease: [0.45, 0, 0.55, 1] }}
      />
    </div>
  );
}
