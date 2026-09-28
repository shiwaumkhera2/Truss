"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/components/providers/Intro";
import { Wordmark } from "@/components/ui/Logo";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

const SESSION_KEY = "truss:intro";
const HOLD_MS = 420;

/**
 * Navy curtain with the wordmark that lifts after a short hold.
 * Skips the hold on repeat visits within a session and for reduced-motion users.
 */
export function Preloader() {
  const { finish } = useIntro();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"hold" | "lift" | "done">("hold");

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    const quick = Boolean(reduce) || seen;
    const hold = quick ? 0 : HOLD_MS;

    const lift = window.setTimeout(() => setPhase("lift"), hold);
    const ready = window.setTimeout(() => finish(), hold + (quick ? 0 : 120));
    const safety = window.setTimeout(() => setPhase("done"), hold + 1200);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(ready);
      window.clearTimeout(safety);
    };
  }, [finish, reduce]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="curtain"
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900 text-white"
          initial={{ y: 0 }}
          animate={{ y: phase === "lift" ? "-100%" : 0 }}
          transition={{ duration: 0.65, ease: EASE_IN_OUT }}
          onAnimationComplete={() => {
            if (phase === "lift") setPhase("done");
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: phase === "lift" ? 0 : 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Wordmark size="lg" />
          </motion.div>
          <motion.span
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-lime"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
