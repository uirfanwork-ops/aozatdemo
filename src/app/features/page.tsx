import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Workflow, KeyRound } from "lucide-react";

import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Reveal, MaskedLines } from "@/components/site/reveal";
import { FeatureShot } from "@/components/site/feature-shot";
import { Button } from "@/components/ui/button";
import { featureCategories, type Feature } from "@/lib/features";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Features. Omni GC",
  description:
    "Every Omni GC feature, from the first lead to the last invoice: sales, estimating, marketing, projects, field crews, client and subcontractor portals, finances, safety, and the AI that runs through all of it.",
};

const TAGS: Record<Feature["tags"][number], { label: string; icon: typeof Bot }> = {
  ai: { label: "AI", icon: Bot },
  automated: { label: "Automated", icon: Workflow },
  portal: { label: "Portal", icon: KeyRound },
};

export default function FeaturesPage() {
  const total = featureCategories.reduce((n, c) => n + c.features.length, 0);

  return (
    <main className="relative">
      <Nav />

      {/* What this page is, and every category at a glance. */}
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
              {total} features across {featureCategories.length} parts of the business. Each one below shows the
              real screen, with what it does in a sentence. The AI drafts and measures; nothing goes out until a
              person says so.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-2">
              {Object.entries(TAGS).map(([k, t]) => (
                <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-[13px] text-foreground/80">
                  <t.icon className="size-3.5 text-brand" />
                  {t.label}
                  <span className="text-muted-foreground">
                    · {featureCategories.reduce((n, c) => n + c.features.filter((f) => f.tags.includes(k as keyof typeof TAGS)).length, 0)}
                  </span>
                </span>
              ))}
            </div>
          </Reveal>

          <nav aria-label="Feature categories" className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featureCategories.map((c, ci) => (
              <Reveal key={c.slug} delay={0.04 * ci}>
                <a href={`#${c.slug}`} className="group flex items-center gap-2.5">
                  <span className="bg-brand-gradient flex size-8 items-center justify-center rounded-lg text-white">
                    <c.icon className="size-4" />
                  </span>
                  <span className="text-[15px] font-semibold text-foreground group-hover:text-brand">{c.title}</span>
                </a>
                <ul className="mt-3.5 space-y-1.5 pl-[42px]">
                  {c.features.map((f) => (
                    <li key={f.slug}>
                      <a href={`#${f.slug}`} className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground">
                        {f.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </nav>
        </div>
      </section>

      {featureCategories.map((c) => (
        <section key={c.slug} id={c.slug} className="scroll-mt-20 border-b border-border">
          <div className="container-x py-20 sm:py-28">
            <Reveal className="max-w-[60ch]">
              <div className="flex items-center gap-3">
                <span className="bg-brand-gradient flex size-10 items-center justify-center rounded-xl text-white">
                  <c.icon className="size-[18px]" />
                </span>
                <span className="text-sm text-muted-foreground">{c.features.length} features</span>
              </div>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.6rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">
                {c.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{c.blurb}</p>
            </Reveal>

            <div className="mt-16 space-y-24 sm:space-y-32">
              {c.features.map((f, i) => (
                <article
                  key={f.slug}
                  id={f.slug}
                  className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-14"
                >
                  <Reveal className={cn("lg:col-span-4", i % 2 === 1 && "lg:order-2")}>
                    <div className="flex flex-wrap gap-1.5">
                      {f.tags.map((t) => {
                        const tag = TAGS[t];
                        return (
                          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-brand/12 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-brand">
                            <tag.icon className="size-3" />
                            {tag.label}
                          </span>
                        );
                      })}
                    </div>
                    <h3 className="font-display mt-4 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{f.name}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-[17px]">{f.summary}</p>
                  </Reveal>
                  <Reveal delay={0.1} className={cn("lg:col-span-8", i % 2 === 1 && "lg:order-1")}>
                    <FeatureShot src={f.shot.src} alt={f.shot.alt} label={f.shot.label} pills={f.pills} />
                  </Reveal>
                </article>
              ))}
            </div>
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
              Book a walkthrough and see Omni GC on one of your own projects.
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
