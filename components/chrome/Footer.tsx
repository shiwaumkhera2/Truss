import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Logo";
import { site } from "@/content/site";

type FooterProps = {
  /** On pages other than the home page, hash links need a leading slash. */
  absoluteHashes?: boolean;
};

export function Footer({ absoluteHashes = false }: FooterProps) {
  const href = (h: string) => (absoluteHashes && h.startsWith("#") ? `/${h}` : h);

  return (
    <footer className="border-t border-white/10 text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${site.name} home`} className="inline-flex">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/60">{site.footer.description}</p>
          </div>

          {site.footer.columns.map((column) => (
            <div key={column.heading} className="md:col-span-2">
              <p className="text-[13px] text-white/55">{column.heading}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-white/80 transition-colors duration-300 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <a href={href(link.href)} className="text-[15px] text-white/80 transition-colors duration-300 hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3 md:col-start-10">
            <p className="text-[13px] text-white/55">{site.footer.contactLabel}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-4 inline-block text-[15px] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {site.contactEmail}
            </a>
            <a
              href={site.contactPhoneHref}
              className="mt-2 block text-[15px] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {site.contactPhone}
            </a>
            <p className="mt-3 text-[15px] text-white/60">{site.footer.location}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
