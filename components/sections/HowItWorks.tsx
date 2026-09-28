"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const scale = useTransform(smooth, (v) => (reduce ? 1 : v));

  return (
    <section id="how-it-works" data-nav-theme="light" className="bg-off-white py-28 text-ink sm:py-36 lg:py-44">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <TextReveal
              as="h2"
              text={site.howItWorks.headline}
              className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.025em]"
            />
          </div>
          <RevealItem className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[34ch] text-lg leading-relaxed text-secondary">{site.howItWorks.intro}</p>
          </RevealItem>
        </Reveal>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          <div aria-hidden className="absolute left-0 right-0 top-[15px] hidden h-px bg-ink/10 lg:block">
            <motion.div style={{ scaleX: scale }} className="h-full w-full origin-left bg-navy-900" />
          </div>
          <div aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-ink/10 lg:hidden">
            <motion.div style={{ scaleY: scale }} className="h-full w-full origin-top bg-navy-900" />
          </div>

          <ol className="grid gap-14 lg:grid-cols-3 lg:gap-10">
            {site.howItWorks.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="relative pl-12 lg:pl-0">
                <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-ink/15 bg-off-white font-serif text-[15px] leading-none lg:relative lg:mb-8">
                  {i + 1}
                </span>
                <h3 className="font-serif text-[1.75rem] leading-[1.1] tracking-[-0.015em] sm:text-[2rem]">{step.title}</h3>
                <p className="mt-4 max-w-[36ch] text-[17px] leading-relaxed text-secondary">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
