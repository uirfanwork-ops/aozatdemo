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
  Maximize2,
} from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const modules = [
  {
    key: "01",
    icon: Radar,
    title: "Lead generation",
    screen: { src: "/portal/lead-generation.jpg", label: "Lead Manager", alt: "The Omni GC Lead Manager: new leads, qualified, and in estimating, on a board" },
    body: "Watches permit filings, tenders, franchise expansion notices and your own referral network. Every morning there is a short list of jobs worth a phone call, with the reason each one made the cut.",
    detail: ["Permit and tender feeds", "Owner and developer tracking", "Fit score per lead"],
  },
  {
    key: "02",
    icon: Handshake,
    title: "Sales and estimating",
    screen: { src: "/portal/sales-estimating.jpg", label: "AI takeoff", alt: "An Omni GC AI takeoff: measured items with confidence notes beside the floor plan, waiting for review" },
    body: "Drafts the takeoff, prices it against your real cost history, writes the proposal in your voice and follows up until the client answers. You review numbers, not paperwork.",
    detail: ["Takeoff from drawings", "Cost history pricing", "Follow-up cadence"],
  },
  {
    key: "03",
    icon: Megaphone,
    title: "Marketing",
    screen: { src: "/portal/marketing.jpg", label: "Automations", alt: "Omni GC automations: email flows that chase quotes, welcome clients, and ask for reviews" },
    body: "Turns finished jobs into case studies, site photos into posts, and quiet months into outreach. Runs on a calendar you approve once a quarter.",
    detail: ["Case studies from close-out", "Site photo pipeline", "Quarterly calendar"],
  },
  {
    key: "04",
    icon: HardHat,
    title: "Project management",
    screen: { src: "/portal/project-management.jpg", label: "Project schedule", alt: "An Omni GC project schedule: phases and line items on a Gantt chart, with progress from site reports" },
    body: "Schedules trades, chases submittals, logs daily reports from the field and flags the slip before it becomes a claim. Change orders go out the same day they are discovered.",
    detail: ["Trade scheduling", "Daily logs and RFIs", "Same-day change orders"],
  },
  {
    key: "05",
    icon: Users,
    title: "Client and customer management",
    screen: { src: "/portal/client-management.jpg", label: "Client portal", alt: "A client's Omni GC portal: their projects in construction, starting soon, and completed" },
    body: "Every owner, architect and tenant gets a portal with the schedule, the budget and the photos. Questions get answered before they turn into calls to your cell.",
    detail: ["Owner portal", "Approvals and sign-offs", "Warranty tracking"],
  },
  {
    key: "06",
    icon: Landmark,
    title: "Financial dashboards",
    screen: { src: "/portal/financial-dashboards.jpg", label: "Expenses", alt: "Omni GC expenses: spend by category and by project, with tax split out" },
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
          highlight="One seat."
          className="mt-6 max-w-[14ch] text-[clamp(2.4rem,6vw,5.4rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em]"
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
      className="font-display flex items-baseline gap-4 border-b border-border py-4 text-2xl font-semibold uppercase tracking-[-0.02em] last:border-b-0"
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
    <div className={cn("pb-8 lg:sticky lg:top-24", isLast ? "lg:pb-32" : "")} style={{ zIndex: index + 1 }}>
      <motion.article
        style={{ scale }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] will-change-transform"
      >
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-background" />
        <div className="p-7 sm:p-9">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-[52ch]">
              <div className="flex items-center gap-3">
                <span className="bg-brand-gradient flex size-10 items-center justify-center rounded-xl text-white">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-sm text-muted-foreground">
                  {module.key} / 06
                </span>
              </div>
              <h3 className="font-display mt-6 text-3xl font-bold uppercase tracking-[-0.03em] sm:text-4xl">{module.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">{module.body}</p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:max-w-[230px] lg:flex-col lg:items-start">
              {module.detail.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-[13px] text-foreground/80"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <ModuleScreen screen={module.screen} />
        </div>
      </motion.article>
    </div>
  );
}

/**
 * The module's screen from the product itself, run on made-up data, in a window
 * frame. A click opens it full size, since the card shows it at about half scale.
 */
function ModuleScreen({ screen }: { screen: (typeof modules)[number]["screen"] }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={screen.src} alt={screen.alt} width={1600} height={1000} loading="lazy" className="block h-auto w-full" />
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Open a larger view of the ${screen.label} screen`}
          className="group/screen mt-7 block w-full overflow-hidden rounded-2xl border border-border bg-secondary/60 text-left shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-brand/50"
        >
          <span className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </span>
            <span className="ml-2 text-xs text-muted-foreground">Omni GC · {screen.label}</span>
            <Maximize2 className="ml-auto size-3.5 text-muted-foreground transition-colors group-hover/screen:text-brand" aria-hidden="true" />
          </span>
          {img}
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="w-[min(96vw,1400px)] max-w-none overflow-hidden rounded-2xl border-border bg-black p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{screen.label}</DialogTitle>
        {img}
      </DialogContent>
    </Dialog>
  );
}
