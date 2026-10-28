"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Reveal } from "@/components/site/reveal";
import { media } from "@/lib/media";

export function PhotoBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">How it is built</p>
            <blockquote className="font-display mt-6 text-[clamp(1.8rem,3.6vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.025em]">
              It learned the trade from people who have been burned by a bad draw schedule. It does
              not guess at a number it cannot show you.
            </blockquote>
            <p className="mt-6 text-muted-foreground">
              Every figure in Omni GC traces back to a source document, a bank line or a field entry.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="bg-brand-gradient rounded-[28px] p-[2px] shadow-[0_40px_90px_-50px_var(--brand-glow)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-[radial-gradient(90%_70%_at_70%_30%,oklch(0.75_0.1_200)_0%,oklch(0.35_0.08_255)_100%)] sm:aspect-[16/10]">
              <motion.div style={{ y }} className="absolute inset-[-8%] will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.craneSunset}
                  alt="Tower crane working on a site at sunset, dust in the air"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
