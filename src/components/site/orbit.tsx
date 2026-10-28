import { Reveal } from "@/components/site/reveal";

const nodes = ["Takeoffs", "Estimates", "Proposals", "Sales", "Clients", "Projects", "Schedules", "Invoices", "Finances", "Marketing"];

export function Orbit() {
  return (
    <section className="border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">How it runs</p>
            <h2 className="mt-6 text-[clamp(2.4rem,5.6vw,5rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em]">
              Automated.
              <br />
              <span className="text-brand-gradient">End to end.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              Every function reads from the same record of the job. A takeoff becomes an estimate,
              the estimate becomes a proposal, the proposal becomes a schedule, the schedule becomes
              an invoice. Nothing is retyped.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <div className="absolute inset-[8%] rounded-full border border-border" />
            <div className="absolute inset-[28%] rounded-full border border-dashed border-border" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              {nodes.map((n, i) => {
                const a = (i / nodes.length) * 2 * Math.PI;
                return (
                  <line
                    key={n}
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(a) * 42}
                    y2={50 + Math.sin(a) * 42}
                    stroke="var(--border)"
                    strokeWidth="0.4"
                  />
                );
              })}
            </svg>
            <div className="absolute left-1/2 top-1/2 z-10 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient text-center text-sm font-semibold uppercase tracking-wide text-white shadow-[0_20px_50px_-20px_var(--brand-glow)]">
              Omni GC
            </div>
            <div className="absolute inset-0 animate-[spin_90s_linear_infinite] motion-reduce:animate-none">
              {nodes.map((n, i) => {
                const a = (i / nodes.length) * 2 * Math.PI;
                const x = 50 + Math.cos(a) * 42;
                const y = 50 + Math.sin(a) * 42;
                return (
                  <div
                    key={n}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="animate-[spin_90s_linear_infinite_reverse] motion-reduce:animate-none">
                      <span className="block whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium shadow-sm">
                        {n}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
