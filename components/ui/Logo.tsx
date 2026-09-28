import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type MarkProps = { className?: string };

/**
 * The brand mark from /public/logo.svg.
 * When `site.logo.monochrome` is true the SVG is used as a CSS mask and takes the current text colour,
 * so it flips between white and ink automatically. Set it to false for a multi-colour logo.
 */
export function Mark({ className }: MarkProps) {
  if (site.logo.monochrome) {
    return (
      <span
        role="img"
        aria-label={site.name}
        className={cn("inline-block h-7 w-7 shrink-0 bg-current", className)}
        style={{
          WebkitMaskImage: `url(${site.logo.src})`,
          maskImage: `url(${site.logo.src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }
  return (
    <Image
      src={site.logo.src}
      alt={site.name}
      width={site.logo.width}
      height={site.logo.height}
      className={cn("h-7 w-7 shrink-0", className)}
    />
  );
}

type WordmarkProps = { size?: "md" | "lg"; className?: string };

/** Mark plus the serif "Truss" wordmark, inheriting the surrounding text colour. */
export function Wordmark({ size = "md", className }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center", size === "lg" ? "gap-3" : "gap-2.5", className)}>
      <Mark className={size === "lg" ? "h-9 w-9" : "h-6 w-6"} />
      <span
        className={cn(
          "font-serif leading-none tracking-[-0.02em]",
          size === "lg" ? "text-[2.75rem]" : "text-[26px]",
        )}
      >
        {site.name}
      </span>
    </span>
  );
}
