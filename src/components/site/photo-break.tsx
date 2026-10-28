"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Reveal } from "@/components/site/reveal";
import { media } from "@/lib/media";

export function PhotoBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);

  return (
    <section ref={ref} className="relative h-[90svh] min-h-[560px] overflow-hidden bg-[radial-gradient(90%_70%_at_70%_30%,oklch(0.32_0.06_45)_0%,oklch(0.14_0.004_60)_100%)]">
      <motion.div style={{ y, scale }} className="absolute inset-[-10%] will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.craneSunset}
          alt="Tower crane working on a site at sunset, dust in the air"
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.opacity = "0"; }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,10,9,0.95)_0%,rgba(11,10,9,0.35)_45%,rgba(11,10,9,0.55)_100%)]" />
      <div className="grain absolute inset-0" />
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-16 sm:pb-20">
        <Reveal>
          <p className="eyebrow">How it is built</p>
          <blockquote className="font-display mt-6 max-w-[24ch] text-[clamp(1.8rem,4.2vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.025em]">
            It learned the trade from people who have been burned by a bad draw schedule. It does
            not guess at a number it cannot show you.
          </blockquote>
          <p className="mt-6 text-sm text-foreground/70">
            Every figure in Omni GC traces back to a source document, a bank line or a field entry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
