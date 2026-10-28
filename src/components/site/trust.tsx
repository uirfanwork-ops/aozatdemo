"use client";

import { ShieldCheck, Database, Eye, FileCheck2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { media } from "@/lib/media";

const points = [
  {
    icon: Database,
    h: "Your data stays yours",
    b: "Every record, drawing and invoice can be exported in full at any time. We do not train on your jobs and we do not sell your pipeline.",
  },
  {
    icon: Eye,
    h: "Nothing moves money without you",
    b: "Draws, payments and contracts are drafted by the operator and released by a named person. The approval log is permanent.",
  },
  {
    icon: ShieldCheck,
    h: "Built for audit",
    b: "Each figure links to its source. Your accountant, your bonding agent and your lawyer can trace any number back to the document that produced it.",
  },
  {
    icon: FileCheck2,
    h: "Hosted in Canada or the US",
    b: "You choose the region. Encryption at rest and in transit, single sign-on, and role-based access down to the individual job.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Security and control</p>
          </Reveal>
          <MaskedLines
            lines={["Automation you", "can sign off on."]}
            className="mt-6 text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.04]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              A general contractor carries bonding, liens and warranty exposure on every job. The
              software that runs that company has to be boring where it counts.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-[radial-gradient(80%_60%_at_30%_20%,oklch(0.9_0.04_200)_0%,oklch(0.78_0.08_250)_100%)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.concreteBeams}
                alt="Concrete beams and shadows inside a structure under construction"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
          onError={(e) => { e.currentTarget.style.opacity = "0"; }}
              />
              
            </div>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {points.map((p) => (
            <Card key={p.h} className="h-full gap-0 py-0 shadow-none">
                <CardContent className="flex h-full flex-col p-7">
                  <span className="bg-brand-gradient flex size-10 items-center justify-center rounded-xl text-white">
                    <p.icon className="size-[18px]" />
                  </span>
                  <h3 className="font-display mt-8 text-xl font-medium tracking-tight">{p.h}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.b}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
