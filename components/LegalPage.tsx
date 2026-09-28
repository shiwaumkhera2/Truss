import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Container } from "@/components/ui/Container";
import { site, type LegalSection } from "@/content/site";

type LegalPageProps = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <>
      <Nav initialTheme="light" />
      <main data-nav-theme="light" className="bg-off-white text-ink">
        <Container className="pb-24 pt-40 sm:pb-32 sm:pt-48">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <header className="lg:col-span-5">
              <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.025em]">{title}</h1>
              <p className="mt-5 text-sm text-secondary">{updated}</p>
            </header>
            <div className="space-y-12 lg:col-span-6 lg:col-start-7">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-2xl tracking-[-0.015em] sm:text-[1.75rem]">{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-ink/80">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
              <p className="text-[17px] text-ink/80">
                {site.footer.contactLabel}:{" "}
                <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink">
                  {site.contactEmail}
                </a>{" "}
                or{" "}
                <a href={site.contactPhoneHref} className="underline underline-offset-4 decoration-ink/30 hover:decoration-ink">
                  {site.contactPhone}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </main>
      <div data-nav-theme="dark" className="bg-navy-900">
        <Footer absoluteHashes />
      </div>
    </>
  );
}
