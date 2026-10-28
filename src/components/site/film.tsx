"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { explainer, explainerSrc } from "@/lib/media";

/** The 90-second tour, inline: the poster until a click, then the film with its own controls. */
export function Film() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = video.current;
    if (!v) return;
    if (!v.getAttribute("src")) v.src = explainerSrc();
    setPlaying(true);
    void v.play();
  };

  return (
    <section id="film" className="scroll-mt-20 bg-background pb-28 pt-4 sm:pb-36">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[52ch] text-center">
          <p className="eyebrow">The 90-second tour</p>
          <h2 className="font-display mt-6 text-[clamp(1.9rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.025em]">
            Lead, quote, build, market.{" "}
            <span className="text-brand-gradient">One click at each step.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Watch a lead come in, get measured and priced, run as a project with its invoices,
            selections, subtrades and expenses, and end up on your social feed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 sm:mt-16">
          <div className="bg-brand-gradient rounded-[28px] p-[2px] shadow-[0_40px_90px_-40px_var(--brand-glow)]">
            <div className="relative aspect-video overflow-hidden rounded-[26px] bg-black">
              <video
                ref={video}
                className="h-full w-full"
                poster={explainer.poster}
                controls={playing}
                playsInline
                preload="none"
                onPlay={() => setPlaying(true)}
              />
              {!playing && (
                <button
                  type="button"
                  onClick={start}
                  className="group/play absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/45 via-transparent to-transparent p-4 sm:p-8"
                  aria-label="Play the 90-second Omni GC tour"
                >
                  <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/50 py-1.5 pl-1.5 pr-4 text-sm font-medium text-white backdrop-blur-md sm:py-2 sm:pl-2 sm:pr-6 sm:text-base">
                    <span className="bg-brand-gradient flex size-10 items-center justify-center rounded-full text-brand-foreground shadow-[0_12px_32px_-12px_var(--brand-glow)] transition-transform duration-300 group-hover/play:scale-105 sm:size-14">
                      <Play className="ml-0.5 size-4 fill-current sm:size-5" />
                    </span>
                    Watch the tour · 1:30
                  </span>
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
