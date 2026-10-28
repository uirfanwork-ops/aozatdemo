"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowDownRight, CircleDot } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { imagery } from "@/lib/media";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <section id="dashboard" className="relative border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Finance</p>
            </Reveal>
            <MaskedLines
              lines={["Know the margin", "before the job is over."]}
              className="mt-6 max-w-[16ch] text-[clamp(2.2rem,5.4vw,4.8rem)] font-medium leading-[1.02]"
            />
          </div>
          <Reveal delay={0.1} className="flex max-w-[560px] flex-col gap-5 sm:flex-row sm:items-end">
            <div className="shrink-0 overflow-hidden rounded-2xl border border-border sm:w-[200px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagery.estimator}
                alt="An estimator at a site-office desk with a takeoff drawing on screen"
                className="aspect-[3/2] w-full object-cover sm:aspect-[4/5]"
                loading="lazy"
              />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Job costing, draws, retainage and cash sit on one screen. The numbers below are
              illustrative, drawn from a sample company, so you can see the shape of the view.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-16 [perspective:1600px]">
          <motion.div
            style={{ rotateX, y, opacity, transformOrigin: "50% 0%" }}
            className="will-change-transform"
          >
            <Tabs defaultValue="finance" className="gap-6">
              <TabsList className="h-auto rounded-full border bg-secondary p-1">
                <TabsTrigger value="finance" className="h-9 rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Finance</TabsTrigger>
                <TabsTrigger value="pipeline" className="h-9 rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Pipeline</TabsTrigger>
                <TabsTrigger value="projects" className="h-9 rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Projects</TabsTrigger>
              </TabsList>
              <Frame>
                <TabsContent value="finance">
                  <FinanceView />
                </TabsContent>
                <TabsContent value="pipeline">
                  <PipelineView />
                </TabsContent>
                <TabsContent value="projects">
                  <ProjectsView />
                </TabsContent>
              </Frame>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_50px_100px_-50px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-5 py-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-4 text-xs text-muted-foreground">Northfield Contracting, sample workspace</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4 sm:p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{value}</p>
      <p className={cn("mt-2 flex items-center gap-1 text-[12px]", up ? "text-steel" : "text-brand")}>
        {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
        {delta}
      </p>
    </div>
  );
}

function FinanceView() {
  const bars = [52, 58, 49, 66, 71, 64, 80, 77, 86, 92, 84, 96];
  const months = ["D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N"];
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
        <Stat label="Cash on hand" value="$1.84M" delta="Reconciled nightly" up />
        <Stat label="Receivables over 60 days" value="$212K" delta="2 invoices flagged" />
        <Stat label="Backlog" value="$9.6M" delta="Across 11 active jobs" up />
      </div>
      <div className="rounded-2xl border border-border bg-secondary/50 p-5 lg:col-span-8">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Billed vs. cost, trailing 12 months</p>
          <div className="flex gap-4 text-[11.5px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-foreground/60" />Billed</span>
            <span className="flex items-center gap-1.5"><span className="bg-brand-gradient size-2 rounded-sm" />Cost</span>
          </div>
        </div>
        <div className="mt-6 flex h-[220px] items-end gap-2 sm:gap-3">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-end gap-[3px]" style={{ height: 190 }}>
                <div className="flex-1 rounded-t-sm bg-foreground/35" style={{ height: `${h}%` }} />
                <div className="bg-brand-gradient flex-1 rounded-t-sm" style={{ height: `${h * 0.72}%` }} />
              </div>
              <span className="text-[11px] text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-[12.5px]">
          <div><p className="text-muted-foreground">Gross margin</p><p className="mt-1">27.9%</p></div>
          <div><p className="text-muted-foreground">Retainage held</p><p className="mt-1">$486K</p></div>
          <div><p className="text-muted-foreground">Next draw</p><p className="mt-1">Nov 4</p></div>
        </div>
      </div>
    </div>
  );
}

function PipelineView() {
  const cols = [
    { name: "Identified", items: ["Fit-out, Mississauga", "Mezzanine, Vaughan", "Clinic, Brampton", "QSR, Milton"] },
    { name: "Estimating", items: ["Warehouse addition, Ajax", "Dealership, Oakville"] },
    { name: "Proposed", items: ["Restaurant, Toronto", "Daycare, Burlington", "Lab, Markham"] },
    { name: "Awarded", items: ["Gym, Hamilton"] },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cols.map((c) => (
        <div key={c.name} className="rounded-2xl border border-border bg-secondary/50 p-3">
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="text-xs text-muted-foreground">{c.name}</p>
            <span className="text-xs text-muted-foreground">{c.items.length}</span>
          </div>
          <div className="space-y-2">
            {c.items.map((it) => (
              <div key={it} className="rounded-xl border border-border/70 bg-card px-3 py-2.5 text-[12.5px] text-foreground/90">
                {it}
                <p className="mt-1 text-[11px] text-muted-foreground">Follow-up scheduled</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsView() {
  const rows = [
    ["2241", "Tenant fit-out, Mississauga", "Week 14 of 20", "On schedule", true],
    ["2238", "Industrial mezzanine, Vaughan", "Week 6 of 9", "On schedule", true],
    ["2236", "Restaurant buildout, Oakville", "Week 11 of 12", "Watch, permit", false],
    ["2231", "Clinic renovation, Brampton", "Week 3 of 10", "On schedule", true],
    ["2229", "Warehouse addition, Ajax", "Week 18 of 22", "Watch, steel delivery", false],
  ] as const;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-secondary/50">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="px-4 py-3 font-normal">Job</th>
            <th className="px-4 py-3 font-normal">Scope</th>
            <th className="hidden px-4 py-3 font-normal sm:table-cell">Progress</th>
            <th className="px-4 py-3 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([id, scope, prog, status, ok]) => (
            <tr key={id} className="border-b border-border/60 last:border-b-0">
              <td className="px-4 py-3 text-muted-foreground">{id}</td>
              <td className="px-4 py-3 text-foreground/90">{scope}</td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{prog}</td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex items-center gap-1.5", ok ? "text-steel" : "text-brand")}>
                  <CircleDot className="size-3" />
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
