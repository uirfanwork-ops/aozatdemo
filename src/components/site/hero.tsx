"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MaskedLines } from "@/components/site/reveal";
import { media } from "@/lib/media";
import { ExplainerDialog, PlayBadge } from "@/components/site/explainer";
import { Blueprint } from "@/components/site/blueprint";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="bg-wash relative overflow-hidden bg-background pt-36 sm:pt-44">
      <Blueprint />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-x relative z-10 flex flex-col items-center text-center"
      >
        <MaskedLines
          as="h1"
          delay={0.3}
          lines={["Construction management", "for the new age."]}
          highlight="for the new age."
          className="mx-auto max-w-[18ch] text-[clamp(2.6rem,6.6vw,6rem)] font-bold leading-[0.98] tracking-[-0.035em] text-foreground"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mx-auto mt-8 max-w-[62ch] text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Omni GC manages your leads, sales, marketing, client management, vendor management,
          takeoffs, quotations, proposals and full project management with one AI operator.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="brand" size="xl" asChild>
            <a href="#apply">
              Request a walkthrough
              <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </Button>
          <ExplainerDialog>
            <Button variant="outline" size="xl">
              <Play className="fill-current" />
              Watch the explainer
            </Button>
          </ExplainerDialog>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 1.05 }}
        className="container-x relative z-10 mt-14 sm:mt-20"
      >
        <motion.div style={{ y: panelY, scale: panelScale }} className="will-change-transform">
          <div className="bg-brand-gradient rounded-[28px] p-[2px] shadow-[0_40px_90px_-40px_var(--brand-glow)]">
            <div className="group/panel relative aspect-[16/9] overflow-hidden rounded-[26px] bg-[#0d0c0b] sm:aspect-[21/9]">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/hero-poster.jpg"
                aria-hidden="true"
              >
                <source src={media.heroVideo} type="video/mp4" />
                <source src="/hero.webm" type="video/webm" />
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,23,38,0.55)_0%,transparent_45%)]" />
              <ExplainerDialog>
                <button
                  type="button"
                  aria-label="Watch the explainer"
                  className="absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <PlayBadge />
                </button>
              </ExplainerDialog>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="h-20 sm:h-28" />
    </section>
  );
}
