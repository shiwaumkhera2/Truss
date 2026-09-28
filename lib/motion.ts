import type { Transition, Variants } from "framer-motion";

/** Soft "out-expo" ease used for every reveal. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Symmetric ease for curtains and wipes. */
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const SPRING_SOFT: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 1 };
export const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 500, damping: 32, mass: 0.8 };

export const REVEAL_DISTANCE = 24;
export const REVEAL_DURATION = 0.7;

/**
 * Fade + rise variants. `custom` is an optional delay in seconds so the same
 * variants can be orchestrated: <motion.div variants={fadeUp} custom={0.4} />
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};
