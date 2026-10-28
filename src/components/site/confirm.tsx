import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const lines = [
  ["Flooring, 4,200 sq ft", "$38,150"],
  ["Drywall and paint", "$21,640"],
  ["Ceilings and lighting", "$27,290"],
];

export function Confirm() {
  return (
    <section className="border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal>
            <div className="mx-auto max-w-[560px] rounded-3xl border border-border bg-card p-6 shadow-[0_40px_90px_-50px_rgba(15,23,42,0.35)] sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Proposal, ready to sign</p>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">Draft 3</span>
              </div>
              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">Unit 4B fit-out</h3>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {lines.map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between py-3 text-[15px]">
                    <span className="text-foreground/85">{l}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-semibold">$87,080</span>
              </div>
              <Button variant="brand" size="lg" className="mt-6 w-full" type="button">
                <Check /> Approve and send
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Drafted, priced and checked by Omni GC. Released by you.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Control</p>
            <h2 className="mt-6 text-[clamp(2.4rem,5.6vw,5rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em]">
              Confirmed
              <br />
              <span className="text-brand-gradient">by you.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              Anything that commits money or a date waits for a person. The work arrives finished.
              You read it, you tap once, it goes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
