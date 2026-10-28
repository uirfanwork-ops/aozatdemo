"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const roles = [
  "Estimator", "Bookkeeper", "Project manager", "Scheduler", "Marketer", "Coordinator",
  "Accountant", "Proposal writer", "Collections", "Dispatcher", "Site admin", "Safety lead",
  "Office admin", "Takeoff tech", "Payroll", "Purchasing", "Receptionist", "Controller",
];

// Deterministic scatter so server and client render the same layout.
const spots = roles.map((_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 18 + ((i * 29) % 31);
  return { x: 50 + Math.cos(a) * r * 0.95, y: 50 + Math.sin(a) * r * 0.75 };
});

export function Army() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.55], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);
  const oneOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const oneScale = useTransform(scrollYProgress, [0.6, 0.8], [0.9, 1]);

  return (
    <section className="border-t border-border bg-background">
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="absolute inset-0">
            {roles.map((r, i) => (
              <Role key={r} label={r} spot={spots[i]} index={i} progress={scrollYProgress} />
            ))}
          </div>
          <div className="container-x relative z-10 text-center">
            <motion.h2
              style={{ opacity: titleOpacity, y: titleY }}
              className="mx-auto max-w-[14ch] text-[clamp(2.4rem,6.5vw,5.8rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] [text-shadow:0_0_18px_#fff,0_0_36px_#fff,0_0_60px_#fff]"
            >
              Running a construction company takes <span className="text-brand-gradient">an army.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: oneOpacity, scale: oneScale }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-none tracking-[-0.04em] [text-shadow:0_0_18px_#fff,0_0_36px_#fff]"
            >
              One <span className="text-brand-gradient">operator.</span>
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
}

function Role({
  label,
  spot,
  index,
  progress,
}: {
  label: string;
  spot: { x: number; y: number };
  index: number;
  progress: MotionValue<number>;
}) {
  const inStart = 0.05 + (index % 6) * 0.03;
  const opacity = useTransform(progress, [inStart, inStart + 0.1, 0.5, 0.62], [0, 0.75, 0.75, 0]);
  const x = useTransform(progress, [0.5, 0.7], ["0%", `${(50 - spot.x) * 2}%`]);
  const y = useTransform(progress, [0.5, 0.7], ["0%", `${(50 - spot.y) * 2}%`]);
  return (
    <motion.span
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, opacity, x, y }}
      className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-white px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
    >
      {label}
    </motion.span>
  );
}
