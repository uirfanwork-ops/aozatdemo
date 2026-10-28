"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MaskedLines } from "@/components/site/reveal";
import { Blueprint } from "@/components/site/blueprint";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
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
          <Button variant="outline" size="xl" asChild>
            <a href="#film">
              <Play className="fill-current" />
              Watch the tour
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <div className="h-12 sm:h-16" />
    </section>
  );
}
