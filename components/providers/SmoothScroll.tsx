"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export const SCROLL_OFFSET = -88;

/**
 * Intercepts in-page anchor clicks so they scroll through Lenis
 * (smooth, offset for the fixed nav) and updates the URL hash.
 */
function AnchorScroll() {
  const lenis = useLenis();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      let target: HTMLElement | null = null;
      try {
        target = document.querySelector<HTMLElement>(hash);
      } catch {
        return;
      }
      if (!target) return;

      event.preventDefault();
      const focusFirst = target.hasAttribute("data-focus-first");
      const onComplete = () => {
        if (focusFirst) target?.querySelector<HTMLElement>("input, button")?.focus({ preventScroll: true });
      };

      if (lenis) {
        lenis.scrollTo(target, { offset: SCROLL_OFFSET, immediate: !!reduce, force: true, onComplete });
      } else {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        onComplete();
      }
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis, reduce]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: !reduce,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        autoRaf: true,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}
