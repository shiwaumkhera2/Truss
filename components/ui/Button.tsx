"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowRight } from "@/components/ui/Icons";
import { SPRING_SNAPPY } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Variant = "lime" | "ghostDark" | "ghostLight" | "ink";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  loading?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-navy-900 hover:bg-lime-hover hover:shadow-glow",
  ghostDark: "border border-white/20 text-white hover:border-white/60 hover:bg-white/[0.06]",
  ghostLight: "border border-ink/15 text-ink hover:border-ink/50 hover:bg-ink/[0.04]",
  ink: "bg-ink text-white hover:bg-navy-800",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

const MotionLink = motion.create(Link);

/** Magnetic pill button. Scales to 0.98 on press; the arrow slides right on hover. */
export function Button({
  children,
  variant = "lime",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
  loading,
  arrow = true,
  magnetic = true,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className={cn("transition-opacity duration-300", loading && "opacity-80")}>{children}</span>
      {loading ? (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
        />
      ) : arrow ? (
        <ArrowRight className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
      ) : null}
    </>
  );

  let element: React.ReactNode;
  if (href && (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http"))) {
    element = (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.98 }}
        transition={SPRING_SNAPPY}
        className={classes}
      >
        {content}
      </motion.a>
    );
  } else if (href) {
    element = (
      <MotionLink
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.98 }}
        transition={SPRING_SNAPPY}
        className={classes}
      >
        {content}
      </MotionLink>
    );
  } else {
    element = (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        whileTap={{ scale: 0.98 }}
        transition={SPRING_SNAPPY}
        className={classes}
      >
        {content}
      </motion.button>
    );
  }

  if (!magnetic) return element;
  return <Magnetic className={className?.includes("w-full") ? "block w-full" : undefined}>{element}</Magnetic>;
}
