"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop: one giant O in the shape of the logo, open at one o'clock with the
 * orange dot in the gap. A warm light laps the ring and the dot flares as it arrives.
 * A faint dusk construction site and a slow warm glow sit underneath.
 * One canvas, paused off screen and in background tabs, still under reduced motion.
 */

const WARM = [243, 112, 33];
const AMBER = [250, 176, 64];

const GAP_CENTER = -Math.PI / 3; // one o'clock
const GAP = 0.62;
const ARC_START = GAP_CENTER + GAP / 2;
const ARC_LEN = Math.PI * 2 - GAP;
const LAP_SECONDS = 9;

export function SystemField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let ring = { cx: 0, cy: 0, R: 0, band: 0 };
    let raf = 0;
    let running = false;
    let last = performance.now();
    let lap = 0.35;
    let dotFlare = 0;

    const photo = new Image();
    photo.src = "/images/hero-site-dusk.jpg";
    photo.onload = () => draw(performance.now(), 0);

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = Math.min(w * (w < 640 ? 0.46 : 0.36), h * 0.44);
      ring = { cx: w / 2, cy: Math.max(h * 0.52, R + 96), R, band: R * 0.16 };
    }

    function glowDot(x: number, y: number, radius: number, color: number[], alpha: number) {
      const g = ctx!.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${alpha})`);
      g.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(x, y, radius, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawPhoto(t: number) {
      ctx!.fillStyle = "#0a0908";
      ctx!.fillRect(0, 0, w, h);
      if (!photo.complete || !photo.naturalWidth) return;
      const drift = reduce ? 0 : Math.sin((t / 40) * Math.PI);
      const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight) * (1.07 + 0.03 * drift);
      const iw = photo.naturalWidth * scale;
      const ih = photo.naturalHeight * scale;
      ctx!.globalAlpha = 0.28;
      ctx!.drawImage(photo, (w - iw) / 2 + drift * w * 0.01, (h - ih) * 0.6 - drift * h * 0.008, iw, ih);
      ctx!.globalAlpha = 1;
      const vg = ctx!.createLinearGradient(0, 0, 0, h);
      vg.addColorStop(0, "rgba(10,9,8,0.55)");
      vg.addColorStop(0.45, "rgba(10,9,8,0.15)");
      vg.addColorStop(1, "rgba(10,9,8,0.85)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, w, h);
      const rg = ctx!.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.35, w / 2, h * 0.45, Math.max(w, h) * 0.75);
      rg.addColorStop(0, "rgba(10,9,8,0)");
      rg.addColorStop(1, "rgba(10,9,8,0.95)");
      ctx!.fillStyle = rg;
      ctx!.fillRect(0, 0, w, h);
    }

    function drawO(t: number, dt: number) {
      const { cx, cy, R, band } = ring;
      if (!R) return;

      // the O: a wide, quiet band with crisp edges
      ctx!.lineCap = "round";
      ctx!.strokeStyle = "rgba(236,231,223,0.055)";
      ctx!.lineWidth = band;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, ARC_START, ARC_START + ARC_LEN);
      ctx!.stroke();
      ctx!.lineCap = "butt";
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = "rgba(236,231,223,0.14)";
      for (const r of [R - band / 2, R + band / 2]) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, r, ARC_START, ARC_START + ARC_LEN);
        ctx!.stroke();
      }

      // warm light lapping the O
      if (!reduce) lap = (lap + dt / LAP_SECONDS) % 1;
      const prev = lap - dt / LAP_SECONDS;
      if (prev < 0 && dt > 0) dotFlare = 1;
      const head = ARC_START + lap * ARC_LEN;
      const trail = Math.min(2.2, lap * ARC_LEN);
      ctx!.globalCompositeOperation = "lighter";
      const steps = 48;
      for (let i = 0; i < steps; i++) {
        const k = i / steps;
        const a0 = head - (trail * (i + 1)) / steps;
        const a1 = head - trail * k;
        ctx!.strokeStyle = `rgba(250,${140 + Math.round(50 * (1 - k))},60,${0.32 * Math.pow(1 - k, 2.2)})`;
        ctx!.lineWidth = band * (1 - 0.35 * k);
        ctx!.beginPath();
        ctx!.arc(cx, cy, R, a0, a1);
        ctx!.stroke();
      }
      glowDot(cx + Math.cos(head) * R, cy + Math.sin(head) * R, band * 1.6, AMBER, 0.35);

      // the orange dot in the gap
      dotFlare = Math.max(0, dotFlare - dt * 0.6);
      const dx = cx + Math.cos(GAP_CENTER) * R;
      const dy = cy + Math.sin(GAP_CENTER) * R;
      const breathe = 0.5 + 0.5 * Math.sin(t * 1.2);
      glowDot(dx, dy, band * (2.2 + 1.4 * dotFlare), WARM, 0.22 + 0.1 * breathe + 0.3 * dotFlare);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "rgba(243,112,33,0.85)";
      ctx!.beginPath();
      ctx!.arc(dx, dy, band * 0.62, 0, Math.PI * 2);
      ctx!.fill();
    }

    function draw(now: number, dt: number) {
      const t = now / 1000;
      drawPhoto(t);
      ctx!.globalCompositeOperation = "lighter";
      glowDot(w * (0.4 + 0.1 * Math.sin(t * 0.07)), h * (0.48 + 0.08 * Math.cos(t * 0.05)), Math.max(w, h) * 0.36, WARM, 0.06);
      ctx!.globalCompositeOperation = "source-over";
      drawO(t, dt);
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    layout();
    draw(performance.now(), 0);

    const ro = new ResizeObserver(() => {
      layout();
      draw(performance.now(), 0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* keep the headline area calm so the type always reads first */}
      <div className="absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_42%,rgba(10,9,8,0.5)_0%,rgba(10,9,8,0)_100%)]" />
    </div>
  );
}
