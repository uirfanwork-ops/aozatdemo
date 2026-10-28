"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { tiers, PRICE_PLACEHOLDER, type Billing, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");
  return (
    <section id="pricing" className="relative border-t border-border bg-background py-28 sm:py-36">
      <div className="bg-wash pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Pricing</p>
          </Reveal>
          <MaskedLines
            lines={["Pick how much", "of the office it runs."]}
            highlight="of the office it runs."
            className="mt-6 text-[clamp(2.2rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em]"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              Start on the platform, add the AI operator when you are ready, or have us build it
              around your company.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex justify-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08} className="h-full">
              <TierCard tier={t} billing={billing} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  const opts: { v: Billing; label: string }[] = [
    { v: "monthly", label: "Monthly" },
    { v: "annual", label: "Annual" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="relative inline-flex items-center rounded-full border border-border bg-card p-1"
    >
      {opts.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.v)}
            className={cn(
              "relative z-10 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring/50",
              active ? "text-brand-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="billing-pill"
                className="bg-brand-gradient absolute inset-0 -z-10 rounded-full shadow-[0_10px_30px_-12px_var(--brand-glow)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {o.label}
            {o.v === "annual" && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  active ? "bg-black/15 text-brand-foreground" : "bg-brand/15 text-brand",
                )}
              >
                Save up to 18%
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TierCard({ tier, billing }: { tier: Tier; billing: Billing }) {
  const popular = !!tier.popular;
  const raw = tier.price;
  const price = raw === null ? PRICE_PLACEHOLDER : typeof raw === "string" ? raw : raw[billing];
  const placeholder = raw === null;
  const perPeriod = typeof raw === "object" && raw !== null;
  const note = perPeriod ? (billing === "annual" ? "per month, billed annually" : "per month") : tier.priceNote;

  const card = (
    <Card
      className={cn(
        "relative h-full gap-0 overflow-hidden rounded-[22px] py-0 shadow-none",
        popular ? "border-transparent bg-card" : "border-border bg-card/70",
      )}
    >
      {popular && (
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/20 blur-[90px]" />
      )}
      <CardHeader className="relative gap-0 px-7 pt-7 sm:px-8 sm:pt-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Omni GC</p>
          {popular && (
            <Badge variant="brand" className="px-2.5 py-1 text-[11px]">
              Most popular
            </Badge>
          )}
        </div>
        <h3 className="font-display mt-2 text-3xl font-bold uppercase tracking-[-0.03em]">
          {popular ? <span className="text-brand-gradient">{tier.name}</span> : tier.name}
        </h3>
        <p className="mt-3 min-h-[3.25rem] text-[15px] leading-relaxed text-muted-foreground">
          {tier.tagline}
        </p>
        <div className="mt-7 flex h-14 items-baseline gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={price}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                "font-display font-bold tracking-[-0.03em]",
                placeholder ? "text-2xl text-muted-foreground" : "text-5xl",
              )}
            >
              {price}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm text-muted-foreground">{note}</span>
        </div>
      </CardHeader>

      <CardContent className="relative mt-7 flex-1 px-7 sm:px-8">
        <Button
          asChild
          size="lg"
          variant={popular ? "brand" : "outline"}
          className="h-12 w-full rounded-full text-[15px]"
        >
          <a href={tier.href}>
            {tier.cta}
            <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </Button>
        <Separator className="my-7" />
        <ul className="space-y-3.5">
          {tier.included.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[15px] text-foreground/90">
              <span
                className={cn(
                  "mt-[2px] flex size-5 shrink-0 items-center justify-center rounded-full",
                  popular ? "bg-brand-gradient text-brand-foreground" : "bg-secondary text-brand",
                )}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
          {tier.excluded?.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[15px] text-muted-foreground/70">
              <span className="mt-[2px] flex size-5 shrink-0 items-center justify-center rounded-full border border-border">
                <Minus className="size-3" />
              </span>
              <span className="line-through decoration-muted-foreground/40">{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="h-8" />
    </Card>
  );

  if (!popular) return card;

  // Gradient frame around the popular plan, lifted slightly on large screens.
  return (
    <div className="bg-brand-gradient h-full rounded-[24px] p-[1.5px] shadow-[0_40px_90px_-40px_var(--brand-glow)] lg:-translate-y-3">
      {card}
    </div>
  );
}
