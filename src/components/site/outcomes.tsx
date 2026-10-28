"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { TrendingUp, Layers, Scissors, Activity } from "lucide-react";

const outcomes = [
  { big: "10x", rest: "your revenue.", icon: TrendingUp },
  { big: "5x", rest: "your project capacity.", icon: Layers },
  { big: null, rest: "Lower admin and overhead costs.", icon: Scissors },
  { big: null, rest: "Track and analyze every lifeline of your construction company.", icon: Activity },
];

/**
 * Pinned panel. Each line takes one slice of the scroll: it fades and lifts in,
 * holds, then hands over to the next. The last line holds until the section ends.
 */
export function Outcomes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = outcomes.length;

  return (
    <section className="island relative border-t border-border bg-background text-foreground">
      <div ref={ref} className="relative" style={{ height: `${n * 90 + 40}vh` }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* progress rail */}
          <div className="absolute left-1/2 top-[14%] flex -translate-x-1/2 gap-2">
            {outcomes.map((o, i) => (
              <Dot key={o.rest} index={i} total={n} progress={scrollYProgress} />
            ))}
          </div>
          <div className="container-x relative h-[60vh] w-full">
            {outcomes.map((o, i) => (
              <Line key={o.rest} index={i} total={n} progress={scrollYProgress} item={o} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function slice(index: number, total: number) {
  const step = 1 / total;
  const start = index * step;
  return { start, end: start + step, step };
}

function Line({
  index,
  total,
  progress,
  item,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  item: (typeof outcomes)[number];
}) {
  const { start, end, step } = slice(index, total);
  const last = index === total - 1;
  const first = index === 0;
  const fadeIn = first ? [0, 0.08 * step] : [start, start + 0.3 * step];
  const fadeOut = last ? [0.995, 1] : [end - 0.25 * step, end];
  const opacity = useTransform(progress, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [first ? 1 : 0, 1, 1, last ? 1 : 0], { clamp: true });
  const y = useTransform(progress, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [first ? 0 : 40, 0, 0, last ? 0 : -40], { clamp: true });
  const blur = useTransform(progress, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [first ? 0 : 8, 0, 0, last ? 0 : 8], { clamp: true });
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const Icon = item.icon;

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-[0_20px_40px_-20px_var(--brand-glow)]">
        <Icon className="size-6" />
      </span>
      <h3 className="font-display mt-10 max-w-[16ch] text-[clamp(2.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
        {item.big && <span className="text-brand-gradient">{item.big} </span>}
        {item.rest}
      </h3>
    </motion.div>
  );
}

function Dot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const { start, end } = slice(index, total);
  const active = useTransform(progress, (p): number => (p >= start && (p < end || index === total - 1) ? 1 : 0));
  const width = useTransform(active, [0, 1], [8, 28]);
  const opacity = useTransform(active, [0, 1], [0.25, 1]);
  return (
    <motion.span
      style={{ width, opacity }}
      className="h-2 rounded-full bg-brand-gradient transition-[width] duration-300"
    />
  );
}
