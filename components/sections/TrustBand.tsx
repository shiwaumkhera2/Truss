import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function TrustBand() {
  return (
    <section
      id="compliance"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-navy-900 py-28 text-white sm:py-36 lg:py-44"
    >
      <Parallax distance={90} className="pointer-events-none absolute inset-0" innerClassName="absolute inset-0">
        <div aria-hidden className="blueprint-grid absolute -inset-[15%] opacity-70" />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-20%] h-[70%] w-[120%] -translate-x-1/2 rounded-[100%] bg-navy-800/50 blur-3xl"
        />
      </Parallax>

      <Container className="relative">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <span aria-hidden className="mb-10 block h-px w-16 bg-lime" />
            <TextReveal
              as="h2"
              text={site.trust.headline}
              className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.025em]"
            />
          </div>
          <RevealItem className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[36ch] text-lg leading-relaxed text-white/65">{site.trust.intro}</p>
          </RevealItem>
        </Reveal>

        <Reveal
          as="dl"
          stagger={0.12}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 border-t border-white/10 pt-14 lg:mt-28 lg:grid-cols-4"
        >
          {site.trust.stats.map((stat) => (
            <RevealItem key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-4 max-w-[22ch] text-[15px] leading-snug text-white/60">{stat.label}</dt>
              <dd className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </dd>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal as="ul" stagger={0.06} className="mt-20 flex flex-wrap gap-3 lg:mt-28">
          {site.trust.keywords.map((keyword) => (
            <RevealItem
              as="li"
              key={keyword}
              className="rounded-full border border-white/15 px-5 py-2.5 text-[15px] text-white/80 transition-colors duration-300 hover:border-lime/70 hover:text-white"
            >
              {keyword}
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
