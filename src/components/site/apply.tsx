"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/site/reveal";

export function Apply() {
  const [sent, setSent] = useState(false);
  return (
    <section id="apply" className="relative border-t border-border bg-background py-28 sm:py-36">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-card">
            <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-accent/15 blur-[120px]" />
            <div className="grain absolute inset-0" />
            <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
              <div>
                <p className="eyebrow">Private rollout</p>
                <h2 className="mt-6 max-w-[14ch] text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[1.04]">
                  We onboard a handful of contractors at a time.
                </h2>
                <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
                  Each rollout starts with a working session on your real jobs. If the fit is
                  there, you are live inside a month. If it is not, we will tell you.
                </p>
                <ul className="mt-8 space-y-3 text-[15px] text-foreground/85">
                  {[
                    "Commercial, industrial and franchise general contractors",
                    "Revenue in the low millions and up",
                    "An owner who wants to get out of the inbox",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-[3px] flex size-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="size-3" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                className="flex flex-col gap-3 self-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="sr-only" htmlFor="name">Name</label>
                <Input id="name" name="name" placeholder="Your name" required autoComplete="name" />
                <label className="sr-only" htmlFor="company">Company</label>
                <Input id="company" name="company" placeholder="Company" required autoComplete="organization" />
                <label className="sr-only" htmlFor="email">Work email</label>
                <Input id="email" name="email" type="email" placeholder="Work email" required autoComplete="email" />
                <label className="sr-only" htmlFor="revenue">Annual revenue</label>
                <Input id="revenue" name="revenue" placeholder="Approximate annual revenue" />
                <Button type="submit" variant="accent" size="xl" className="mt-2 w-full" disabled={sent}>
                  {sent ? "Received. We will be in touch." : "Request a walkthrough"}
                  {!sent && <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />}
                </Button>
                <p className="text-center text-[12.5px] text-muted-foreground">
                  No mailing list. One reply from a person.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
