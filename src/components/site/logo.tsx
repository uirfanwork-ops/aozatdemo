import { cn } from "@/lib/utils";

/**
 * Omni GC mark: a heavy open ring with an orange dot sitting in the gap at the top right,
 * followed by the wordmark. Vector, so it stays sharp at any size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn("size-7", className)}>
      {/* ring with a gap at roughly 1 o'clock */}
      <path
        d="M39.6 18.6A16.5 16.5 0 1 1 28.6 8.2"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* dot in the gap */}
      <circle cx="37.6" cy="10.4" r="5.2" fill="var(--brand)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <LogoMark />
      <span className="font-display text-[19px] font-bold tracking-[-0.03em]">
        Omni GC
      </span>
    </span>
  );
}
