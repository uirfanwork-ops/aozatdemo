import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="omni-logo" x1="0" y1="0" x2="26" y2="26">
            <stop stopColor="var(--brand)" />
            <stop offset="1" stopColor="var(--brand-2)" />
          </linearGradient>
        </defs>
        <rect width="26" height="26" rx="7" fill="url(#omni-logo)" />
        <path d="M7 18V8h3.2l2.8 5.4L15.8 8H19v10" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
        Omni<span className="text-muted-foreground"> GC</span>
      </span>
    </span>
  );
}
