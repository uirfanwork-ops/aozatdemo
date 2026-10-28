"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { explainer } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Click-to-play explainer in a shadcn Dialog. Local file first, Drive preview as fallback. */
export function ExplainerDialog({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [useDrive, setUseDrive] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="w-[min(96vw,1200px)] max-w-none overflow-hidden rounded-2xl border-border bg-black p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Omni GC explainer</DialogTitle>
        <div className="aspect-video w-full">
          {open && !useDrive && (
            <video
              className="h-full w-full"
              src={explainer.local}
              controls
              autoPlay
              playsInline
              onError={() => setUseDrive(true)}
            />
          )}
          {open && useDrive && (
            <iframe
              className="h-full w-full"
              src={`https://drive.google.com/file/d/${explainer.driveId}/preview`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Omni GC explainer"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Large centred play control for the hero panel. */
export function PlayBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "group/play inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/40 py-2 pl-2 pr-5 text-sm font-medium text-white backdrop-blur-md transition-[background-color,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-black/55 group-hover/panel:-translate-y-px",
        className,
      )}
    >
      <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-full text-brand-foreground shadow-[0_12px_32px_-12px_var(--brand-glow)] transition-transform duration-300 group-hover/play:scale-105">
        <Play className="ml-0.5 size-4 fill-current" />
      </span>
      Watch the explainer
    </span>
  );
}

