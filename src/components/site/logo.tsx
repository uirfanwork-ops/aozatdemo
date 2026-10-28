import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 18V8h3.2l2.8 5.4L15.8 8H19v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
        Omni<span className="text-muted-foreground"> GC</span>
      </span>
    </span>
  );
}
