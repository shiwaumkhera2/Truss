"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/** Grayscale logo strip: a slow CSS marquee that also drifts with scroll. */
export function TrustedBy() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, (v) => (reduce ? 0 : -v * 0.12));
  const logos = site.hero.trustedBy.logos;
  const items = [...logos, ...logos];

  return (
    <div className="border-t border-white/10 py-7 sm:py-8">
      <Container>
        <p className="mb-6 text-center text-[13px] text-white/50">{site.hero.trustedBy.label}</p>
      </Container>
      <div className="mask-fade-x overflow-hidden">
        <motion.div style={{ x }}>
          <ul className="flex w-max animate-marquee items-center" aria-label={site.hero.trustedBy.label}>
            {items.map((logo, i) => (
              <li
                key={`${logo.name}-${i}`}
                aria-hidden={i >= logos.length || undefined}
                className="flex items-center whitespace-nowrap px-7 text-white/45 sm:px-10"
              >
                {logo.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width ?? 160}
                    height={logo.height ?? 40}
                    className="h-7 w-auto object-contain opacity-70 brightness-0 invert"
                  />
                ) : (
                  <span className="font-serif text-[22px] tracking-[-0.01em] sm:text-2xl">{logo.name}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
