import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xl border border-border bg-foreground/[0.03] px-4 text-base text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted-foreground/70 focus-visible:border-accent/60 focus-visible:bg-foreground/[0.05] focus-visible:ring-4 focus-visible:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
