import { TrendingUp, Layers, Scissors, Activity } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const outcomes = [
  { big: "10x", rest: "your revenue.", icon: TrendingUp },
  { big: "5x", rest: "your project capacity.", icon: Layers },
  { big: null, rest: "Lower admin and overhead costs.", icon: Scissors },
  { big: null, rest: "Track and analyze every lifeline of your construction company.", icon: Activity },
];

export function Outcomes() {
  return (
    <section className="island relative border-t border-border bg-background py-24 text-foreground sm:py-32">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2">
          {outcomes.map((o, i) => (
            <Reveal key={o.rest} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col justify-between gap-12 bg-background p-8 sm:p-10 lg:min-h-[300px] lg:p-12">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
                  <o.icon className="size-5" />
                </span>
                <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">
                  {o.big && <span className="text-brand-gradient">{o.big} </span>}
                  {o.rest}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
