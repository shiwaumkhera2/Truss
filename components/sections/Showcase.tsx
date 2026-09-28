"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { Check } from "@/components/ui/Icons";
import { MockFrame } from "@/components/mocks/MockFrame";
import { site, type Feature } from "@/content/site";
import { cn } from "@/lib/utils";

export function Showcase() {
  const [active, setActive] = useState(0);
  const features = site.showcase.features;

  return (
    <section id="product" data-nav-theme="light" className="bg-white py-28 text-ink sm:py-36 lg:py-44">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              text={site.showcase.headline}
              className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.025em]"
            />
          </div>
          <RevealItem className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[36ch] text-lg leading-relaxed text-secondary">{site.showcase.intro}</p>
          </RevealItem>
        </Reveal>

        <div className="mt-20 lg:mt-28 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center">
              <MockFrame active={features[active].id} />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
            {features.map((feature, index) => (
              <FeatureBlock
                key={feature.id}
                feature={feature}
                active={active === index}
                onActive={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type FeatureBlockProps = {
  feature: Feature;
  active: boolean;
  onActive: () => void;
};

function FeatureBlock({ feature, active, onActive }: FeatureBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div ref={ref} className="py-12 first:pt-0 lg:flex lg:min-h-[80vh] lg:flex-col lg:justify-center lg:py-0">
      <Reveal>
        <div className={cn("transition-opacity duration-500 ease-out-expo", !active && "lg:opacity-40")}>
          <h3 className="max-w-[18ch] font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] sm:text-[2.5rem]">
            {feature.title}
          </h3>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-secondary sm:text-lg">{feature.body}</p>
          <ul className="mt-8 divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
            {feature.points.map((point) => (
              <li key={point} className="flex items-start gap-3 py-3.5 text-[15px] text-ink/85">
                <Check className="mt-1 shrink-0 text-navy-700" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 lg:hidden">
          <MockFrame active={feature.id} />
        </div>
      </Reveal>
    </div>
  );
}
