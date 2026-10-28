const items = [
  "Lead generation",
  "Estimating",
  "Sales follow-up",
  "Marketing",
  "Scheduling",
  "Subtrade management",
  "Change orders",
  "Client portal",
  "Invoicing",
  "Cash flow",
  "Job costing",
  "Close-out",
];

export function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-background">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex overflow-hidden py-5">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 [animation-play-state:running] hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-sm text-muted-foreground">
                {item}
              </span>
              <span className="size-1 rounded-full bg-brand/70" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
