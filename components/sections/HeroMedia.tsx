"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Full-bleed looping video with a poster underneath and a navy gradient on top.
 * The video mounts after first paint so the poster is the LCP element, then crossfades in.
 */
export function HeroMedia() {
  const reduce = useReducedMotion();
  const [mountVideo, setMountVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.25));

  useEffect(() => {
    if (reduce) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const timer = window.setTimeout(() => setMountVideo(true), 400);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%] brightness-[0.8] will-change-transform">
        <Image
          src={site.hero.video.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        {mountVideo && (
          <video
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out",
              playing ? "opacity-100" : "opacity-0",
            )}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={site.hero.video.poster}
            onPlaying={() => setPlaying(true)}
          >
            <source src={site.hero.video.src} type="video/mp4" />
          </video>
        )}
      </motion.div>
      {/* Scrim: a uniform navy tint keeps white text at AA over bright footage, then a gradient into the page background */}
      <div className="absolute inset-0 bg-navy-900/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 via-navy-900/35 to-navy-900" />
    </div>
  );
}
