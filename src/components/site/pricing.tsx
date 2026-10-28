import { Check, Minus, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { tiers, PRICE_PLACEHOLDER, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
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

        <div className="mt-16 grid items-stretch gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08} className="h-full">
              <TierCard tier={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const popular = !!tier.popular;
  const price = tier.price ?? PRICE_PLACEHOLDER;
  const placeholder = tier.price === null;

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
        <div className="mt-7 flex items-baseline gap-2">
          <span
            className={cn(
              "font-display font-bold tracking-[-0.03em]",
              placeholder ? "text-2xl text-muted-foreground" : "text-5xl",
            )}
          >
            {price}
          </span>
          <span className="text-sm text-muted-foreground">{tier.priceNote}</span>
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
