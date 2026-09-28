import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Problem() {
  return (
    <section data-nav-theme="light" className="bg-off-white py-28 text-ink sm:py-36 lg:py-44">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              text={site.problem.headline}
              className="font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] tracking-[-0.025em]"
            />
          </div>
          <RevealItem className="lg:col-span-5 lg:col-start-8">
            <div className="max-w-[44ch] space-y-5 text-[17px] leading-relaxed text-ink/80 sm:text-lg">
              {site.problem.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
