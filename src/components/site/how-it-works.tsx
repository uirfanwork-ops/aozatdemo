"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, Mic, Send, CalendarClock, FileText, Mail, Loader2 } from "lucide-react";

import { Reveal, MaskedLines } from "@/components/site/reveal";
import { LogoMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Steps through `frames` phases on a timer while the element is on screen, then loops. */
function useLoop(frames: number, stepMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % frames), stepMs);
    return () => window.clearInterval(id);
  }, [inView, frames, stepMs]);
  return { ref, phase };
}

const steps = [
  {
    n: "01",
    title: "Talk to Omni.",
    body: "From the truck, the site or the parking lot. Say what you need the way you would say it to an office manager.",
    image: "/images/pm-voice.jpg",
    alt: "A project manager on a job site at dusk speaking into his phone",
    align: "end" as const,
    Visual: VoiceVisual,
  },
  {
    n: "02",
    title: "Omni does the work.",
    body: "It pulls the drawings and scope, prices the job against your cost history, writes the quote and the cover email, then asks you to sign off.",
    image: "/images/site-office-night.jpg",
    alt: "A site office desk at night with a laptop and drawings",
    align: "start" as const,
    Visual: WorkVisual,
  },
  {
    n: "03",
    title: "You approve. It goes out.",
    body: "One tap sends the quote. Omni books the follow-ups with the client and keeps chasing until you have an answer.",
    image: "/images/pm-approve.jpg",
    alt: "A project manager's hands holding a phone on site at dusk",
    align: "start" as const,
    Visual: ApproveVisual,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">How it works</p>
          </Reveal>
          <MaskedLines
            lines={["Say it.", "Omni does it.", "You approve."]}
            highlight="You approve."
            className="mt-6 text-[clamp(2.4rem,6vw,5.4rem)] font-bold uppercase leading-[0.96] tracking-[-0.03em]"
          />
        </div>

        <div className="mt-20 flex flex-col gap-24 lg:mt-28 lg:gap-32">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
                <Reveal>
                  <p className="text-brand-gradient w-fit font-display text-sm font-semibold">
                    Step {s.n}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(2rem,4vw,3.4rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </Reveal>
              </div>
              <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
                <Reveal delay={0.1}>
                  <Stage image={s.image} alt={s.alt} align={s.align}>
                    <s.Visual />
                  </Stage>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({
  image,
  alt,
  align,
  children,
}: {
  image: string;
  alt: string;
  align: "start" | "end";
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-gradient rounded-[28px] p-[1.5px] shadow-[0_40px_90px_-50px_var(--brand-glow)]">
      <div className="relative overflow-hidden rounded-[26.5px] bg-card">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
          {/* slow drift so the photo never sits dead still */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1.04, 1.1, 1.04], x: ["0%", "-1.5%", "0%"] }}
            transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <div
            className={cn(
              "absolute inset-0 bg-[linear-gradient(to_top,rgba(10,9,8,0.9)_0%,rgba(10,9,8,0.1)_45%,transparent_100%)]",
              align === "start"
                ? "sm:bg-[linear-gradient(90deg,rgba(10,9,8,0.82)_0%,rgba(10,9,8,0.35)_55%,rgba(10,9,8,0.1)_100%)]"
                : "sm:bg-[linear-gradient(270deg,rgba(10,9,8,0.82)_0%,rgba(10,9,8,0.35)_55%,rgba(10,9,8,0.1)_100%)]",
            )}
          />
        </div>
        {/* below the photo on phones, overlaid on larger screens */}
        <div
          className={cn(
            "relative z-10 -mt-20 px-3 pb-3 sm:absolute sm:inset-0 sm:mt-0 sm:flex sm:items-center sm:p-8",
            align === "end" ? "sm:justify-end" : "sm:justify-start",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[340px] rounded-2xl border border-white/10 bg-[#121110]/85 p-4 text-[#ECE7DF] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PanelHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LogoMark className="size-5" />
        <span className="font-display text-sm font-semibold">Omni GC</span>
      </div>
      <span className="text-[11px] text-white/50">{label}</span>
    </div>
  );
}

/* ---------- Step 1: voice ---------- */
const request = "Prepare a quote for Hartwell Developments. Unit 4B fit-out, same scope as last spring.";

function VoiceVisual() {
  // phases: 0 listening, 1-3 transcript grows, 4 understood
  const { ref, phase } = useLoop(6, 1300);
  const shown = phase === 0 ? 0 : Math.min(request.length, Math.round((phase / 3) * request.length));
  return (
    <div ref={ref} className="w-full sm:w-auto">
      <Panel>
        <PanelHeader label={phase >= 4 ? "Got it" : "Listening"} />
        <div className="mt-5 flex items-center gap-3">
          <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-brand-foreground">
            <Mic className="size-5" />
            {phase < 4 && (
              <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
            )}
          </span>
          <div className="flex h-10 flex-1 items-center gap-[3px]">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar w-[3px] flex-1 rounded-full bg-brand/80"
                style={{
                  animationDelay: `${(i * 73) % 900}ms`,
                  animationPlayState: phase < 4 ? "running" : "paused",
                  opacity: phase < 4 ? 1 : 0.35,
                }}
              />
            ))}
          </div>
        </div>
        <p className="mt-5 min-h-[4.5rem] text-[15px] leading-relaxed text-white/90">
          {request.slice(0, shown)}
          {phase > 0 && phase < 4 && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-brand" />}
        </p>
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2.5 text-[13px] text-white/80"
            >
              <Check className="size-4 text-brand" /> Starting the quote for Unit 4B
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>
    </div>
  );
}

/* ---------- Step 2: Omni works ---------- */
const tasks = [
  { icon: FileText, label: "Pulled drawings and last spring's scope" },
  { icon: FileText, label: "Priced against your cost history" },
  { icon: FileText, label: "Quote drafted: $87,080" },
  { icon: Mail, label: "Cover email written to Dana at Hartwell" },
];

function WorkVisual() {
  // phase 0..3 = tasks completing, 4..5 = awaiting approval
  const { ref, phase } = useLoop(7, 1100);
  return (
    <div ref={ref} className="w-full sm:w-auto">
      <Panel>
        <PanelHeader label="Working" />
        <ul className="mt-5 space-y-2.5">
          {tasks.map((t, i) => {
            const done = phase > i;
            const active = phase === i;
            return (
              <li
                key={t.label}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] transition-colors duration-500",
                  done ? "bg-white/[0.06] text-white/90" : active ? "bg-white/[0.04] text-white/80" : "text-white/35",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                    done ? "bg-brand-gradient text-brand-foreground" : "border border-white/15",
                  )}
                >
                  {done ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : active ? (
                    <Loader2 className="size-3.5 animate-spin text-brand" />
                  ) : null}
                </span>
                {t.label}
              </li>
            );
          })}
        </ul>
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="mt-4 flex items-center justify-between rounded-xl border border-brand/40 bg-brand/10 px-3.5 py-3"
            >
              <span className="text-[13.5px] font-medium text-white">Ready for your approval</span>
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand" />
                <span className="relative size-2.5 rounded-full bg-brand" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>
    </div>
  );
}

/* ---------- Step 3: approve and follow up ---------- */
const followUps = [
  "Quote opened check: tomorrow, 9:00 am",
  "Follow-up call with Dana: Thursday",
  "Reminder if no reply: next Monday",
];

function ApproveVisual() {
  // 0 card, 1 tap, 2 sent, 3..5 follow-ups appear, 6 hold
  const { ref, phase } = useLoop(8, 1000);
  const sent = phase >= 2;
  return (
    <div ref={ref} className="w-full sm:w-auto">
      <Panel>
        <PanelHeader label={sent ? "Sent" : "Needs you"} />
        <div className="mt-5 rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-[12px] text-white/50">Quote, Unit 4B fit-out</p>
          <div className="mt-1 flex items-baseline justify-between">
            <p className="font-display text-lg font-semibold">Hartwell Developments</p>
            <p className="font-display text-lg font-semibold">$87,080</p>
          </div>
        </div>
        <div className="relative mt-4">
          <motion.div
            animate={{ scale: phase === 1 ? 0.96 : 1 }}
            transition={{ duration: 0.25, ease }}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors duration-500",
              sent ? "bg-white/[0.08] text-white" : "bg-brand-gradient text-brand-foreground",
            )}
          >
            {sent ? (
              <>
                <Send className="size-4 text-brand" /> Sent to Dana
              </>
            ) : (
              <>
                <Check className="size-4" strokeWidth={3} /> Approve and send
              </>
            )}
          </motion.div>
          {phase === 1 && (
            <span className="pointer-events-none absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/40" />
          )}
        </div>
        <ul className="mt-4 space-y-2">
          {followUps.map((f, i) => (
            <AnimatePresence key={f}>
              {phase >= 3 + i && (
                <motion.li
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex items-center gap-2.5 text-[13px] text-white/80"
                >
                  <CalendarClock className="size-4 shrink-0 text-brand" />
                  {f}
                </motion.li>
              )}
            </AnimatePresence>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
