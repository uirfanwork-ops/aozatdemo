import { ScrollWords, Reveal } from "@/components/site/reveal";

export function Statement() {
  return (
    <section className="container-x py-28 sm:py-36 lg:py-44">
      <Reveal>
        <p className="eyebrow">Why this exists</p>
      </Reveal>
      <ScrollWords
        className="font-display mt-8 max-w-[26ch] text-[clamp(1.9rem,4.6vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-foreground"
        text="A contractor doing eight figures a year still runs on a phone, a truck, and whoever picked up the office line. The estimator is also the PM. The PM is also collections. Omni GC gives that person a staff that never sleeps, so the owner can stop being the bottleneck."
      />
    </section>
  );
}
