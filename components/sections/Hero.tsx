"use client";

import { motion } from "framer-motion";
import { useIntro } from "@/components/providers/Intro";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { HeroMedia } from "@/components/sections/HeroMedia";
import { LeadForm } from "@/components/sections/LeadForm";
import { ScrollCue } from "@/components/sections/ScrollCue";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { site } from "@/content/site";
import { fade, fadeUp } from "@/lib/motion";

export function Hero() {
  const { ready } = useIntro();
  const state = ready ? "visible" : "hidden";

  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-900 text-white"
    >
      <HeroMedia />

      <Container className="relative flex flex-1 flex-col justify-center pb-10 pt-28 sm:pt-32 lg:pb-12 lg:pt-36">
        <div className="text-center">
          <TextReveal
            as="h1"
            lines={site.hero.headline}
            animate={state}
            delay={0.05}
            stagger={0.045}
            className="mx-auto font-serif text-[clamp(2.75rem,6.4vw,4.75rem)] leading-[0.98] tracking-[-0.025em]"
          />
          <motion.p
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate={state}
            className="mx-auto mt-5 max-w-[46ch] text-pretty text-base leading-relaxed text-white/72 sm:mt-6 sm:text-lg"
          >
            {site.hero.subhead}
          </motion.p>
        </div>

        <motion.div variants={fadeUp} custom={0.65} initial="hidden" animate={state} className="mt-9 sm:mt-10 lg:mt-12">
          <LeadForm />
        </motion.div>

        <motion.div variants={fade} custom={1.1} initial="hidden" animate={state} className="mt-10 flex justify-center sm:mt-12">
          <ScrollCue />
        </motion.div>
      </Container>

      <motion.div variants={fade} custom={1.2} initial="hidden" animate={state} className="relative">
        <TrustedBy />
      </motion.div>
    </section>
  );
}
