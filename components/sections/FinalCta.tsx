import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/chrome/Footer";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-navy-900 pt-32 text-white sm:pt-40 lg:pt-48">
      <Container className="text-center">
        <Reveal>
          <TextReveal
            as="h2"
            text={site.finalCta.headline}
            className="mx-auto max-w-[14ch] font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]"
          />
          <RevealItem>
            <p className="mx-auto mt-8 max-w-[40ch] text-pretty text-lg leading-relaxed text-white/65">{site.finalCta.body}</p>
          </RevealItem>
          <RevealItem className="mt-12 flex justify-center">
            <Button variant="lime" size="lg" href="#lead-form">
              {site.finalCta.button}
            </Button>
          </RevealItem>
        </Reveal>
      </Container>
      <div className="mt-32 sm:mt-40">
        <Footer />
      </div>
    </section>
  );
}
