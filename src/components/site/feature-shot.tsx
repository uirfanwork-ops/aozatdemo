"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

const ease = [0.2, 0.8, 0.2, 1] as const;

/*
 * Where the pills sit around a screenshot, as fractions of its box. They hang
 * over the edges so they read as notes pinned to the screen, and each sits at
 * its own depth so it moves further than the screen when the cursor moves.
 */
const SLOTS = [
  { left: "-6%", top: "24%", depth: 26 },
  { right: "-5%", top: "38%", depth: 34 },
  { left: "6%", bottom: "-5%", depth: 22 },
  { right: "8%", top: "-5%", depth: 30 },
] as const;

/**
 * A product screenshot in a window frame that tilts toward the cursor, with
 * short notes popping out around it. On a phone, or with reduced motion, the
 * screen holds still and the notes sit in a row beneath it.
 */
export function FeatureShot({
  src,
  alt,
  label,
  pills,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  pills: string[];
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(ny, { stiffness: 140, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);
  const shiftX = useTransform(sx, [-1, 1], [-8, 8]);
  const shiftY = useTransform(sy, [-1, 1], [-6, 6]);
  const glowX = useTransform(sx, [-1, 1], ["30%", "70%"]);
  const glowY = useTransform(sy, [-1, 1], ["25%", "75%"]);
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(40% 45% at ${x} ${y}, rgba(255,255,255,0.10), transparent 70%)`,
  );

  const move = (e: React.PointerEvent) => {
    if (still || e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    nx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    ny.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const leave = () => {
    nx.set(0);
    ny.set(0);
  };

  return (
    <div className={cn("relative", className)}>
      <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative [perspective:1600px]">
        <motion.div
          style={still ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative will-change-transform"
        >
          <div className="bg-brand-gradient rounded-[22px] p-[1.5px] shadow-[0_40px_90px_-45px_var(--brand-glow)]">
            <div className="relative overflow-hidden rounded-[20.5px] border border-black/20 bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-foreground/15" />
                  <span className="size-2.5 rounded-full bg-foreground/15" />
                  <span className="size-2.5 rounded-full bg-foreground/15" />
                </span>
                <span className="ml-2 truncate text-xs text-muted-foreground">Omni GC · {label}</span>
              </div>
              <motion.div style={still ? undefined : { x: shiftX, y: shiftY, scale: 1.04 }} className="will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} width={1600} height={1000} loading="lazy" className="block h-auto w-full" />
              </motion.div>
              {/* A soft light that follows the cursor across the glass. */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden lg:block"
                style={still ? undefined : { background: glow }}
              />
            </div>
          </div>

          {/* The notes, popping out around the screen on a wide window. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" style={{ transformStyle: "preserve-3d" }}>
            {pills.slice(0, SLOTS.length).map((p, i) => {
              const { depth, ...pos } = SLOTS[i];
              return (
                <Pill key={p} text={p} index={i} style={pos} depth={still ? 0 : depth} sx={sx} sy={sy} />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* On a phone the notes sit under the screen instead. */}
      <ul className="mt-5 flex flex-wrap gap-2 lg:hidden">
        {pills.map((p) => (
          <li key={p} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-[13px] text-foreground/85">
            <span className="bg-brand-gradient size-1.5 rounded-full" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pill({
  text,
  index,
  style,
  depth,
  sx,
  sy,
}: {
  text: string;
  index: number;
  style: Record<string, string>;
  depth: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, [-1, 1], [-depth, depth]);
  const y = useTransform(sy, [-1, 1], [-depth * 0.7, depth * 0.7]);
  return (
    <motion.div className="absolute" style={{ ...style, x, y, translateZ: depth * 2 }}>
      <motion.span
        initial={{ opacity: 0, scale: 0.6, y: 14 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.6, ease, delay: 0.25 + index * 0.12 }}
        className="inline-flex max-w-[260px] items-center gap-2.5 rounded-full border border-white/12 bg-[oklch(0.19_0.006_60/0.92)] py-2 pl-2.5 pr-4 text-[13px] font-medium text-foreground shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        <span className="bg-brand-gradient flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-brand-foreground">
          {index + 1}
        </span>
        <span className="leading-snug">{text}</span>
      </motion.span>
    </motion.div>
  );
}
