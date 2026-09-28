import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Founders() {
  return (
    <section id="founders" data-nav-theme="light" className="bg-off-white py-28 text-ink sm:py-36 lg:py-44">
      <Container>
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <TextReveal
              as="h2"
              text={site.founders.headline}
              className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.025em]"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <RevealItem>
              <p className="max-w-[44ch] text-[17px] leading-relaxed text-ink/80 sm:text-lg">{site.founders.body}</p>
            </RevealItem>

            <RevealItem className="mt-12 grid grid-cols-2 gap-4 sm:gap-6">
              {site.founders.logos.map((logo) => (
                <TiltCard key={logo.name} max={5} lift={4} className="group h-full">
                  <figure className="flex h-full min-h-[8.5rem] flex-col items-center justify-center rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-[0_1px_0_rgba(10,15,26,0.04)] transition-shadow duration-500 ease-out-expo group-hover:shadow-lift sm:min-h-[9.5rem] sm:p-8">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      sizes="(min-width: 1024px) 260px, 45vw"
                      className="h-auto max-h-[4.5rem] w-auto max-w-[85%] object-contain sm:max-h-[5.5rem]"
                    />
                    <figcaption className="sr-only">{logo.name}</figcaption>
                  </figure>
                </TiltCard>
              ))}
            </RevealItem>

            <RevealItem className="mt-12 grid grid-cols-2 gap-6 sm:gap-8">
              {site.founders.people.map((person) => (
                <div key={person.name} className="flex flex-col items-start gap-4 sm:gap-5">
                  {person.portrait ? (
                    <Image
                      src={person.portrait}
                      alt={`Portrait of ${person.name}`}
                      width={144}
                      height={144}
                      quality={85}
                      sizes="(min-width: 640px) 144px, 112px"
                      className="h-28 w-28 rounded-full object-cover ring-1 ring-ink/10 sm:h-36 sm:w-36"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="grid h-28 w-28 place-items-center rounded-full border border-dashed border-ink/25 font-serif text-2xl text-ink/60 sm:h-36 sm:w-36"
                    >
                      {person.initials}
                    </span>
                  )}
                  <div>
                    <p className="text-xl font-medium tracking-[-0.01em] sm:text-2xl">{person.name}</p>
                    <p className="mt-1 text-[15px] text-secondary sm:text-base">{person.role}</p>
                  </div>
                </div>
              ))}
            </RevealItem>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
