import { ScrollWords, Reveal } from "@/components/site/reveal";
import { imagery } from "@/lib/media";

export function Statement() {
  return (
    <section className="island bg-background text-foreground">
      <div className="container-x py-28 sm:py-36 lg:py-44">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow">Why this exists</p>
          </Reveal>
          <ScrollWords
            className="font-display mt-8 max-w-[26ch] text-[clamp(1.9rem,4.6vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-foreground"
            text="A contractor doing eight figures a year still runs on a phone, a truck, and whoever picked up the office line. The estimator is also the PM. The PM is also collections. Omni GC gives that person a staff that never sleeps, so the owner can stop being the bottleneck."
          />
        </div>
        <div className="self-end lg:col-span-4">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagery.foremanBlueprints}
              alt="A foreman in a hard hat reading a set of drawings on a site table"
              className="aspect-[3/2] w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">The person this was built for.</p>
        </div>
      </div>
      </div>
    </section>
  );
}
