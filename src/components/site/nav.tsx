"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#operator", label: "Platform" },
  { href: "#trust", label: "Security" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

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
            <a href="#apply">Sign in</a>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <a href="#apply">
              Request a walkthrough
              <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
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
                    <a href="#apply">Sign in</a>
                  </Button>
                  <Button variant="brand" size="lg" asChild>
                    <a href="#apply">Request a walkthrough</a>
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
