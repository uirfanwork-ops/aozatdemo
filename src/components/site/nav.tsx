"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/site/logo";
import { featureCategories } from "@/lib/features";
import { cn } from "@/lib/utils";

// Page anchors carry the root path so they work from the features page too.
const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#operator", label: "Platform" },
  { href: "/#trust", label: "Security" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

/** How many features each category lists in the menu before "and N more". */
const MENU_PER_CATEGORY = 5;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "container-x flex items-center justify-between transition-[height,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
          scrolled ? "h-16" : "h-[88px]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 border-b border-transparent transition-[opacity,border-color] duration-500",
            scrolled ? "border-border bg-background/75 opacity-100 backdrop-blur-xl" : "opacity-0",
          )}
        />
        <Link href="/" className="relative z-10 text-foreground" aria-label="Omni GC home">
          <Logo />
        </Link>

        <nav className="relative z-10 hidden items-center gap-1 md:flex">
          <FeaturesMenu top={scrolled ? 64 : 88} />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] text-muted-foreground transition-colors duration-300 hover:bg-foreground/[0.05] hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#apply">Sign in</Link>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <Link href="/#apply">
              Request a walkthrough
              <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </Button>
        </div>

        <div className="relative z-10 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col p-6 pt-20">
                <nav className="flex flex-col">
                  <Link href="/features" className="font-display py-3 text-2xl tracking-tight text-foreground/90">
                    Features
                  </Link>
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="font-display py-3 text-2xl tracking-tight text-foreground/90"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
                <Separator className="my-6" />
                <div className="mt-auto flex flex-col gap-3">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/#apply">Sign in</Link>
                  </Button>
                  <Button variant="brand" size="lg" asChild>
                    <Link href="/#apply">Request a walkthrough</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/**
 * Features in the top bar: a link to the features page that, on hover or
 * keyboard focus, drops a panel listing every category and its leading
 * features, each linking to its place on that page.
 */
function FeaturesMenu({ top }: { top: number }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 140);
  };
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const total = featureCategories.reduce((n, c) => n + c.features.length, 0);

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href="/features"
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] transition-colors duration-300 hover:bg-foreground/[0.05] hover:text-foreground",
          open ? "bg-foreground/[0.05] text-foreground" : "text-muted-foreground",
        )}
      >
        Features
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
      </Link>

      <div
        className={cn(
          "fixed inset-x-0 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
        style={{ top }}
      >
        <div className="container-x">
          <div className="mt-2 max-h-[calc(100vh-120px)] overflow-y-auto rounded-3xl border border-border bg-[oklch(0.15_0.005_60/0.97)] p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
              {featureCategories.map((c) => {
                const Icon = c.icon;
                const more = c.features.length - MENU_PER_CATEGORY;
                return (
                  <div key={c.slug}>
                    <Link
                      href={`/features#${c.slug}`}
                      className="flex items-center gap-2 text-[13px] font-semibold text-foreground/90 hover:text-foreground"
                    >
                      <Icon className="size-3.5 text-brand" />
                      {c.title}
                    </Link>
                    <ul className="mt-3 space-y-1.5">
                      {c.features.slice(0, MENU_PER_CATEGORY).map((f) => (
                        <li key={f.slug}>
                          <Link
                            href={`/features#${f.slug}`}
                            className="block truncate text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {f.name}
                          </Link>
                        </li>
                      ))}
                      {more > 0 && (
                        <li>
                          <Link href={`/features#${c.slug}`} className="text-[12.5px] text-brand hover:underline">
                            and {more} more
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
              <p className="text-[13px] text-muted-foreground">
                {total} features across {featureCategories.length} parts of the business.
              </p>
              <Link href="/features" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-foreground hover:text-brand">
                See every feature
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
