"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaskedLines } from "@/components/site/reveal";
import { media } from "@/lib/media";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.35, 0.8]);

  return (
    <section ref={ref} className="relative h-[108svh] min-h-[640px] overflow-hidden bg-[#0b0a09]">
      <motion.div style={{ scale: videoScale, y: videoY }} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.opacity = "0";
          }}
        />
      </motion.div>
      <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-[#0b0a09]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,rgba(11,10,9,0.92)_0%,rgba(11,10,9,0.35)_55%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b0a09]/80 to-transparent" />
      <div className="grain absolute inset-0" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex h-full flex-col justify-end pb-16 sm:pb-20 lg:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <Badge variant="brand" className="px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]">Private rollout. Canada and the US</Badge>
        </motion.div>

        <MaskedLines
          as="h1"
          delay={0.35}
          lines={["One operator.", "The whole company."]}
          className="mt-6 max-w-[18ch] text-[clamp(2.9rem,8.2vw,7.4rem)] font-medium leading-[0.96] text-foreground"
        />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="max-w-[46ch] text-lg leading-relaxed text-foreground/80 sm:text-xl"
          >
            Omni GC runs the office of a general contractor from one screen. It finds the work,
            prices it, wins it, delivers it and closes the books. You make the calls. It does the
            rest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button variant="brand" size="xl" asChild>
              <a href="#apply">
                Request a walkthrough
                <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="xl" className="backdrop-blur-md" asChild>
              <a href="#dashboard">
                <Play className="fill-current" />
                See the product
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
    </section>
  );
}
