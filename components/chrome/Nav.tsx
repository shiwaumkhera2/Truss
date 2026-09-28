"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { EASE, EASE_IN_OUT, SPRING_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SCROLL_OFFSET } from "@/components/providers/SmoothScroll";

type Theme = "dark" | "light";

const PROBE_Y = 42; // vertical centre of the frosted bar (12px offset + 60px tall), where we sample the section behind it

type NavProps = {
  /** Theme to use before any section has been observed. Dark for the home hero, light for text pages. */
  initialTheme?: Theme;
};

/**
 * Transparent over the hero, then a frosted floating bar once you scroll.
 * Text colour follows the section behind it via data-nav-theme attributes.
 */
export function Nav({ initialTheme = "dark" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    if (!sections.length) return;
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      observer?.disconnect();
      const bottom = Math.max(0, window.innerHeight - PROBE_Y - 1);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setTheme(entry.target.getAttribute("data-nav-theme") === "light" ? "light" : "dark");
            }
          }
        },
        { rootMargin: `-${PROBE_Y}px 0px -${bottom}px 0px`, threshold: 0 },
      );
      sections.forEach((s) => observer!.observe(s));
    };

    setup();
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(setup, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = theme === "dark";
  const frosted = scrolled || open;
  const hashHref = (href: string) => (isHome || !href.startsWith("#") ? href : `/${href}`);

  const onLogoClick = (e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    setOpen(false);
    lenis?.start();
    if (lenis) lenis.scrollTo(0, { force: true });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onMenuLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!href.startsWith("#") || !isHome) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    e.preventDefault();
    lenis?.start();
    if (lenis) lenis.scrollTo(target, { offset: SCROLL_OFFSET, force: true });
    else target.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  };

  return (
    <>
      <header
        data-surface={dark || open ? "dark" : "light"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          dark || open ? "text-white" : "text-ink",
        )}
      >
        <div className="mx-auto w-full max-w-[1296px] px-3 sm:px-6 lg:px-8">
          <motion.nav
            aria-label="Main"
            initial={false}
            animate={{ y: frosted ? 12 : 0, height: frosted ? 60 : 80, borderRadius: frosted ? 20 : 0 }}
            transition={SPRING_SOFT}
            className="relative flex items-center justify-between px-4 sm:px-5"
          >
            <motion.div
              aria-hidden
              initial={false}
              animate={{ opacity: frosted ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={cn(
                "absolute inset-0 -z-10 rounded-[inherit] border backdrop-blur-xl transition-colors duration-500",
                dark || open ? "border-white/10 bg-navy-900/70" : "border-ink/[0.06] bg-white/75",
              )}
            />

            <Link href="/" onClick={onLogoClick} aria-label={`${site.name} home`} className="flex items-center">
              <Wordmark />
            </Link>

            <ul className="hidden items-center gap-8 md:flex">
              {site.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={hashHref(link.href)}
                    className="relative text-[15px] opacity-75 transition-opacity duration-300 hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out-expo hover:after:origin-left hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Button size="sm" variant="lime" href={hashHref(site.nav.cta.href)}>
                {site.nav.cta.label}
              </Button>
            </div>

            <button
              type="button"
              className="relative -mr-2 grid h-10 w-10 place-items-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? site.nav.closeLabel : site.nav.menuLabel}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 block h-px w-5 bg-current"
                  animate={open ? { y: 5.5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={SPRING_SOFT}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-px w-5 bg-current"
                  animate={open ? { y: -5.5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={SPRING_SOFT}
                />
              </span>
            </button>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            className="fixed inset-0 z-40 flex flex-col bg-navy-900 px-6 pb-10 pt-32 text-white md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <ul className="flex flex-col gap-2">
              {site.nav.links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={hashHref(link.href)}
                    onClick={(e) => onMenuLink(e, link.href)}
                    className="block border-b border-white/10 py-4 font-serif text-4xl tracking-[-0.02em]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto flex flex-col gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            >
              <Button
                variant="lime"
                size="lg"
                href={hashHref(site.nav.cta.href)}
                onClick={(e) => onMenuLink(e as React.MouseEvent<HTMLAnchorElement>, site.nav.cta.href)}
                className="w-full"
                magnetic={false}
              >
                {site.nav.cta.label}
              </Button>
              <div className="flex flex-col gap-2 text-white/60">
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                <a href={site.contactPhoneHref}>{site.contactPhone}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
