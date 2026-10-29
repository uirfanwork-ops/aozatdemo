import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { FeatureShot } from "@/components/site/feature-shot";
import { Button } from "@/components/ui/button";
import { featureCategories, featureTotal } from "@/lib/features";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Features. Omni GC",
  description:
    "What Omni GC does, from the first lead to the last invoice: sales, estimating, marketing, projects, field crews, client and subcontractor portals, purchasing, finances, safety, and the AI that runs through all of it.",
};

export default function FeaturesPage() {
  return (
    <main className="relative">
      <Nav />

      {/* What this page is, and each part of the business to jump to. */}
      <section className="bg-wash border-b border-border pt-36 sm:pt-44">
        <div className="container-x pb-16 sm:pb-20">
          <Reveal>
            <p className="eyebrow">Features</p>
          </Reveal>
          <MaskedLines
            lines={["Everything a contractor runs,", "in one place."]}
            highlight="in one place."
            className="mt-6 max-w-[20ch] text-[clamp(2.4rem,6vw,5.2rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em]"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              {featureTotal} features across {featureCategories.length} parts of the business. Pick one to see the
              three that contractors use most, on the real screen.
            </p>
          </Reveal>

          <nav aria-label="Parts of the business" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featureCategories.map((c, ci) => (
              <Reveal key={c.slug} delay={0.03 * ci}>
                <a
                  href={`#${c.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors duration-300 hover:border-brand/50 hover:bg-card"
                >
                  <span className="bg-brand-gradient flex size-10 shrink-0 items-center justify-center rounded-xl text-white">
                    <c.icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[15px] font-semibold text-foreground group-hover:text-brand">
                      {c.title}
                      <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-muted-foreground">
                      {c.features.map((f) => f.name).join(" · ")}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </nav>
        </div>
      </section>

      {featureCategories.map((c, i) => (
        <section key={c.slug} id={c.slug} className="scroll-mt-20 border-b border-border">
          <div className="container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-20">
            <Reveal className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
              <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-xl text-white">
                <c.icon className="size-5" />
              </span>
              <h2 className="font-display mt-6 text-[clamp(2rem,4vw,3.2rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">
                {c.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{c.blurb}</p>

              <ol className="mt-8 space-y-5">
                {c.features.map((f, n) => (
                  <li key={f.name} className="flex gap-4">
                    <span className="bg-brand-gradient flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-brand-foreground">
                      {n + 1}
                    </span>
                    <span>
                      <span className="block text-[17px] font-semibold text-foreground">{f.name}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-muted-foreground">{f.summary}</span>
                    </span>
                  </li>
                ))}
              </ol>
              {c.total > c.features.length && (
                <p className="mt-7 text-sm text-muted-foreground">
                  Plus {c.total - c.features.length} more in {c.title}.
                </p>
              )}
            </Reveal>
            <Reveal delay={0.1} className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
              <FeatureShot
                src={c.shot.src}
                alt={c.shot.alt}
                label={c.shot.label}
                pills={c.features.map((f) => f.name)}
              />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="bg-wash">
        <div className="container-x py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="font-display mx-auto max-w-[22ch] text-[clamp(2rem,4.4vw,3.6rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">
              See it run on <span className="text-brand-gradient">your jobs.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-lg text-muted-foreground">
              Book a walkthrough and see every feature on one of your own projects.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="brand" size="xl" asChild>
                <Link href="/#apply">
                  Request a walkthrough
                  <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/#pricing">See pricing</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
