"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Reveal } from "@/components/site/reveal";

const steps = [
  { t: "5:40 am", h: "The brief is waiting", b: "Overnight it reconciled the bank, read the permit feeds and drafted replies to four client emails. You get one page: what moved, what needs you." },
  { t: "7:15 am", h: "Field check-in", b: "Site supers log yesterday from their phones. Delays, deliveries, headcount. It updates the schedule and tells the owner what changed." },
  { t: "9:30 am", h: "Two bids go out", b: "Priced from your cost history, written in your voice, reviewed by you in ten minutes. Follow-ups are already on the calendar." },
  { t: "1:00 pm", h: "A change order, same day", b: "The super flags extra sprinkler heads. The CO is drafted, priced and sent to the owner before the trade leaves site." },
  { t: "4:45 pm", h: "Draw 6 is ready", b: "Progress billing assembled with photos and lien waivers. You approve it and it goes out. Collections follow-up is scheduled." },
  { t: "6:00 pm", h: "You go home", b: "Nothing is waiting on you. The office keeps working." },
];

export function Day() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="day" className="relative border-t border-border bg-background">
      <div className="container-x pt-24 sm:pt-32">
        <Reveal>
          <p className="eyebrow">A day with Omni GC</p>
          <h2 className="mt-6 max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.8rem)] font-medium leading-[1.02]">
            The owner&rsquo;s day, with the busywork removed.
          </h2>
        </Reveal>
      </div>

      {/* Pinned horizontal scroll on large screens */}
      <div ref={ref} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x relative">
            <div className="absolute left-5 right-0 top-[18px] h-px bg-border sm:left-8 lg:left-12">
              <motion.div className="h-px origin-left bg-brand" style={{ scaleX: lineScale }} />
            </div>
          </div>
          <motion.div style={{ x }} className="flex gap-8 pl-[max(1.25rem,calc((100vw-1320px)/2+3rem))] will-change-transform">
            {steps.map((s, i) => (
              <Step key={s.t} {...s} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Vertical fallback on small screens */}
      <div className="container-x mt-14 flex flex-col gap-4 pb-24 lg:hidden">
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.04}>
            <Step {...s} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Step({ t, h, b, index }: { t: string; h: string; b: string; index: number }) {
  return (
    <article className="relative w-full shrink-0 lg:w-[440px]">
      <div className="hidden items-center gap-3 lg:flex">
        <span className="size-[9px] rounded-full border border-brand bg-background" />
        <span className="text-sm text-muted-foreground">{t}</span>
      </div>
      <div className="mt-0 rounded-3xl border border-border bg-card p-7 lg:mt-8">
        <p className="text-sm text-muted-foreground lg:hidden">{t}</p>
        <p className="text-sm text-brand">Step {index + 1}</p>
        <h3 className="font-display mt-3 text-2xl font-medium tracking-tight">{h}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{b}</p>
      </div>
    </article>
  );
}
