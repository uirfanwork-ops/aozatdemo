import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] outline-none transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] select-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_rgb(255_255_255/.12)_inset,0_10px_30px_-12px_rgb(0_0_0/.6)] hover:-translate-y-px hover:bg-primary/92 hover:shadow-[0_1px_0_0_rgb(255_255_255/.16)_inset,0_18px_40px_-14px_rgb(0_0_0/.7)]",
        accent:
          "bg-accent text-accent-foreground shadow-[0_1px_0_0_rgb(255_255_255/.18)_inset,0_12px_32px_-12px_var(--accent-glow)] hover:-translate-y-px hover:brightness-105 hover:shadow-[0_1px_0_0_rgb(255_255_255/.22)_inset,0_20px_44px_-14px_var(--accent-glow)]",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.04]",
        ghost: "text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground",
        link: "rounded-none px-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13px] [&_svg]:size-3.5",
        default: "h-11 px-6 text-[14.5px] [&_svg]:size-4",
        lg: "h-[52px] px-8 text-[15.5px] [&_svg]:size-[18px]",
        xl: "h-14 px-9 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
