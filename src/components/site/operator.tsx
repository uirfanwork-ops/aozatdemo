"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  Radar,
  Handshake,
  Megaphone,
  HardHat,
  Users,
  Landmark,
} from "lucide-react";

import { Reveal, MaskedLines } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const modules = [
  {
    key: "01",
    icon: Radar,
    title: "Lead generation",
    body: "Watches permit filings, tenders, franchise expansion notices and your own referral network. Every morning there is a short list of jobs worth a phone call, with the reason each one made the cut.",
    detail: ["Permit and tender feeds", "Owner and developer tracking", "Fit score per lead"],
  },
  {
    key: "02",
    icon: Handshake,
    title: "Sales and estimating",
    body: "Drafts the takeoff, prices it against your real cost history, writes the proposal in your voice and follows up until the client answers. You review numbers, not paperwork.",
    detail: ["Takeoff from drawings", "Cost history pricing", "Follow-up cadence"],
  },
  {
    key: "03",
    icon: Megaphone,
    title: "Marketing",
    body: "Turns finished jobs into case studies, site photos into posts, and quiet months into outreach. Runs on a calendar you approve once a quarter.",
    detail: ["Case studies from close-out", "Site photo pipeline", "Quarterly calendar"],
  },
  {
    key: "04",
    icon: HardHat,
    title: "Project management",
    body: "Schedules trades, chases submittals, logs daily reports from the field and flags the slip before it becomes a claim. Change orders go out the same day they are discovered.",
    detail: ["Trade scheduling", "Daily logs and RFIs", "Same-day change orders"],
  },
  {
    key: "05",
    icon: Users,
    title: "Client and customer management",
    body: "Every owner, architect and tenant gets a portal with the schedule, the budget and the photos. Questions get answered before they turn into calls to your cell.",
    detail: ["Owner portal", "Approvals and sign-offs", "Warranty tracking"],
  },
  {
    key: "06",
    icon: Landmark,
    title: "Financial dashboards",
    body: "Job costing, cash position, receivables and backlog on one screen, reconciled against the bank every night. You see the margin on each job while there is still time to protect it.",
    detail: ["Live job costing", "Cash and AR ageing", "Backlog and WIP"],
  },
];

/** Scroll-linked ranges must stay inside 0..1 and strictly increase. */
function c01(v: number, i: number) {
  return Math.min(1 - (3 - i) * 0.0001, Math.max(i * 0.0001, v));
}

export function Operator() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="operator" className="relative border-t border-border bg-background">
      <div className="container-x pt-24 sm:pt-32">
        <Reveal>
          <p className="eyebrow">The operator</p>
        </Reveal>
        <MaskedLines
          lines={["Six departments.", "One seat."]}
          className="mt-6 max-w-[14ch] text-[clamp(2.4rem,6vw,5.4rem)] font-medium leading-[1]"
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Each module does the work of a department head. They share one record of every job,
            so a change order in the field shows up in the forecast before lunch.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="container-x relative mt-16 lg:mt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Sticky left rail */}
          <div className="hidden lg:block">
            <div className="sticky top-28 pt-4">
              <ol className="flex flex-col">
                {modules.map((m, i) => (
                  <RailItem key={m.key} index={i} total={modules.length} progress={scrollYProgress}>
                    {m.title}
                  </RailItem>
                ))}
              </ol>
              <div className="mt-10 h-px w-full bg-border">
                <motion.div
                  className="h-px origin-left bg-brand"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </div>

          {/* Stacking cards */}
          <div className="flex flex-col">
            {modules.map((m, i) => (
              <StackCard key={m.key} index={i} total={modules.length} progress={scrollYProgress} module={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RailItem({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const step = 1 / total;
  const start = index * step;
  const r = [start - step * 0.5, start, start + step * 0.8, start + step * 1.2].map(c01);
  const opacity = useTransform(progress, r, [0.3, 1, 1, 0.3]);
  const x = useTransform(progress, [r[0], r[1]], [0, 8]);
  return (
    <motion.li
      style={{ opacity, x }}
      className="font-display flex items-baseline gap-4 border-b border-border py-4 text-2xl tracking-tight last:border-b-0"
    >
      {children}
    </motion.li>
  );
}

function StackCard({
  index,
  total,
  progress,
  module,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  module: (typeof modules)[number];
}) {
  const step = 1 / total;
  const start = index * step;
  // Cards pin at the top and the next one slides over, scaling the previous one back slightly.
  const isLast = index === total - 1;
  const r = [start + step, start + step * 2].map(c01);
  const scale = useTransform(progress, r, isLast ? [1, 1] : [1, 0.94]);
  const dim = useTransform(progress, r, isLast ? [0, 0] : [0, 0.8]);
  const Icon = module.icon;

  return (
    <div className={cn("sticky top-24 pb-8", isLast ? "lg:pb-32" : "")} style={{ zIndex: index + 1 }}>
      <motion.article
        style={{ scale }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] will-change-transform"
      >
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-background" />
        <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_auto]">
          <div className="max-w-[48ch]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-foreground/[0.03] text-brand">
                <Icon className="size-[18px]" />
              </span>
              <span className="text-sm text-muted-foreground">{module.title}</span>
            </div>
            <h3 className="font-display mt-6 text-3xl font-medium tracking-tight sm:text-4xl">{module.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">{module.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {module.detail.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-[13px] text-foreground/80"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <ModulePreview index={index} />
        </div>
      </motion.article>
    </div>
  );
}

/** Small code-drawn UI vignettes so each module card shows the product, not a stock icon. */
function ModulePreview({ index }: { index: number }) {
  const base =
    "relative w-full overflow-hidden rounded-2xl border border-border bg-background/70 p-4 lg:w-[300px] xl:w-[340px]";
  if (index === 0)
    return (
      <div className={base}>
        <Row label="Today's leads" value="7 new" />
        {[
          ["Permit, Mississauga", "Tenant fit-out, 14,200 sq ft", "92"],
          ["Tender, Vaughan", "Industrial mezzanine", "81"],
          ["Referral, Oakville", "Restaurant buildout", "77"],
        ].map(([a, b, c]) => (
          <div key={a} className="mt-2 flex items-center justify-between rounded-lg border border-border/70 px-3 py-2.5">
            <div>
              <p className="text-[12.5px] text-foreground/90">{a}</p>
              <p className="text-[11.5px] text-muted-foreground">{b}</p>
            </div>
            <span className="text-xs text-brand">{c}</span>
          </div>
        ))}
      </div>
    );
  if (index === 1)
    return (
      <div className={base}>
        <Row label="Proposal, draft 3" value="Review" />
        <div className="mt-3 space-y-2">
          {[
            ["Demolition and disposal", 68],
            ["Framing and drywall", 100],
            ["Mechanical", 84],
            ["Electrical", 72],
            ["Finishes", 55],
          ].map(([l, w]) => (
            <div key={l as string}>
              <div className="flex justify-between text-[11.5px] text-muted-foreground">
                <span>{l}</span>
                <span>{w}%</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-foreground/10">
                <div className="h-1 rounded-full bg-steel" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-muted-foreground">Priced against 41 similar jobs</p>
      </div>
    );
  if (index === 2)
    return (
      <div className={base}>
        <Row label="Calendar, November" value="12 scheduled" />
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-md border border-border/60",
                [2, 5, 9, 12, 16, 19, 23, 26].includes(i) && "border-brand/40 bg-brand/20",
                [7, 14, 21, 27].includes(i) && "bg-foreground/[0.06]",
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-muted-foreground">Case study queued from job 2241 close-out</p>
      </div>
    );
  if (index === 3)
    return (
      <div className={base}>
        <Row label="Job 2241, week 14" value="On schedule" />
        <div className="mt-3 space-y-2">
          {[
            ["Steel erection", 0, 60, true],
            ["Roofing", 40, 35, true],
            ["Mechanical rough-in", 55, 30, false],
            ["Electrical rough-in", 60, 30, false],
            ["Drywall", 85, 15, false],
          ].map(([l, s, w, done]) => (
            <div key={l as string} className="flex items-center gap-3">
              <span className="w-[108px] truncate text-[11.5px] text-muted-foreground">{l}</span>
              <div className="relative h-2 flex-1 rounded-full bg-foreground/[0.06]">
                <div
                  className={cn("absolute h-2 rounded-full", done ? "bg-foreground/60" : "bg-brand/80")}
                  style={{ left: `${s}%`, width: `${w}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-brand">Change order 07 issued 2:14 pm</p>
      </div>
    );
  if (index === 4)
    return (
      <div className={base}>
        <Row label="Owner portal" value="3 approvals" />
        <div className="mt-3 space-y-2">
          {[
            ["Finish schedule rev. B", "Approved"],
            ["CO-07, added sprinkler heads", "Awaiting"],
            ["Progress draw 6", "Approved"],
          ].map(([a, b]) => (
            <div key={a} className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2.5">
              <span className="text-[12.5px] text-foreground/90">{a}</span>
              <span className={cn("text-xs", b === "Approved" ? "text-steel" : "text-brand")}>
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className={base}>
      <Row label="Cash position" value="Reconciled 11:58 pm" />
      <div className="mt-3 flex items-end gap-1.5">
        {[42, 48, 44, 60, 58, 66, 70, 64, 78, 82, 76, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-foreground/[0.08]" style={{ height: `${h}px` }}>
            <div className="h-full w-full rounded-sm bg-gradient-to-t from-brand/70 to-brand/20" style={{ opacity: i > 8 ? 1 : 0.55 }} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[11.5px] text-muted-foreground">
        <span>Receivables over 60 days</span>
        <span className="text-foreground/90">2 invoices</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-[11.5px] text-foreground/80">{value}</span>
    </div>
  );
}
