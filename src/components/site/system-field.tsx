"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop: a faint network of nodes. Warm pulses of light travel along the links,
 * light up the node they reach, and often hand off to a neighbour, like work moving
 * through a system. Two soft glows drift underneath. Canvas, so it stays sharp and light.
 * Pauses off screen and in background tabs; draws one still frame under reduced motion.
 */

type Node = { x: number; y: number; r: number; glow: number; phase: number };
type Pulse = { a: number; b: number; t: number; speed: number; hops: number };

const WARM = [243, 112, 33]; // brand orange
const AMBER = [250, 176, 64]; // brand amber

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
    let nodes: Node[] = [];
    let links: [number, number][] = [];
    let neighbours: number[][] = [];
    const pulses: Pulse[] = [];
    let raf = 0;
    let running = false;
    let last = performance.now();
    let spawnClock = 0;

    // Deterministic layout so the field looks composed, not random noise.
    let seed = 11;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed = 11;
      const cols = w < 640 ? 5 : w < 1100 ? 8 : 11;
      const rows = w < 640 ? 7 : 6;
      const cw = w / cols;
      const rh = h / rows;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() < 0.22) continue; // leave gaps so it reads as a network, not a grid
          nodes.push({
            x: (c + 0.5) * cw + (rand() - 0.5) * cw * 0.7,
            y: (r + 0.5) * rh + (rand() - 0.5) * rh * 0.7,
            r: 1.4 + rand() * 1.4,
            glow: 0,
            phase: rand() * Math.PI * 2,
          });
        }
      }
      // Link each node to its two or three nearest neighbours.
      const linkSet = new Set<string>();
      links = [];
      neighbours = nodes.map(() => []);
      const maxD = Math.max(cw, rh) * 1.6;
      nodes.forEach((n, i) => {
        const near = nodes
          .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
          .filter((o) => o.j !== i && o.d < maxD)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2 + (i % 2));
        for (const { j } of near) {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (linkSet.has(key)) continue;
          linkSet.add(key);
          links.push([i, j]);
          neighbours[i].push(j);
          neighbours[j].push(i);
        }
      });
      pulses.length = 0;
    }

    function spawn(from?: number, hops = 0) {
      if (!nodes.length) return;
      const a = from ?? Math.floor(Math.random() * nodes.length);
      const options = neighbours[a];
      if (!options || !options.length) return;
      const b = options[Math.floor(Math.random() * options.length)];
      pulses.push({ a, b, t: 0, speed: 0.28 + Math.random() * 0.22, hops });
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

    function draw(now: number, dt: number) {
      const t = now / 1000;
      ctx!.clearRect(0, 0, w, h);

      // Two slow warm glows drifting underneath everything.
      ctx!.globalCompositeOperation = "lighter";
      glowDot(w * (0.3 + 0.12 * Math.sin(t * 0.07)), h * (0.42 + 0.1 * Math.cos(t * 0.05)), Math.max(w, h) * 0.38, WARM, 0.07);
      glowDot(w * (0.72 + 0.1 * Math.cos(t * 0.06)), h * (0.58 + 0.12 * Math.sin(t * 0.08)), Math.max(w, h) * 0.32, AMBER, 0.05);
      ctx!.globalCompositeOperation = "source-over";

      // Links.
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = "rgba(236,231,223,0.07)";
      ctx!.beginPath();
      for (const [i, j] of links) {
        ctx!.moveTo(nodes[i].x, nodes[i].y);
        ctx!.lineTo(nodes[j].x, nodes[j].y);
      }
      ctx!.stroke();

      // Pulses: a bright head with a fading trail along the link.
      ctx!.globalCompositeOperation = "lighter";
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed * dt;
        const A = nodes[p.a];
        const B = nodes[p.b];
        const head = Math.min(p.t, 1);
        const tail = Math.max(0, head - 0.35);
        const hx = A.x + (B.x - A.x) * head;
        const hy = A.y + (B.y - A.y) * head;
        const tx = A.x + (B.x - A.x) * tail;
        const ty = A.y + (B.y - A.y) * tail;
        const grad = ctx!.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, "rgba(243,112,33,0)");
        grad.addColorStop(1, "rgba(250,176,64,0.75)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(hx, hy);
        ctx!.stroke();
        glowDot(hx, hy, 22, AMBER, 0.42);
        glowDot(hx, hy, 3, [255, 226, 180], 0.9);

        if (p.t >= 1) {
          B.glow = 1;
          pulses.splice(k, 1);
          // Hand the work on, sometimes to two places, up to a few hops.
          if (p.hops < 4 && Math.random() < 0.75) spawn(p.b, p.hops + 1);
          if (p.hops < 2 && Math.random() < 0.18) spawn(p.b, p.hops + 1);
        }
      }

      // Nodes, flaring when a pulse lands, then settling.
      for (const n of nodes) {
        n.glow = Math.max(0, n.glow - dt * 0.6);
        const idle = 0.18 + 0.08 * Math.sin(t * 0.8 + n.phase);
        if (n.glow > 0.01) glowDot(n.x, n.y, 34 * n.glow + 8, WARM, 0.5 * n.glow);
        ctx!.fillStyle = `rgba(236,231,223,${idle + 0.6 * n.glow})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r + n.glow * 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      spawnClock += dt;
      // Keep a calm number of journeys in flight.
      if (spawnClock > 0.75 && pulses.length < 9) {
        spawnClock = 0;
        spawn();
      }
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
    if (reduce) {
      draw(performance.now(), 0);
    } else {
      // Seed a few journeys so the first frame is already alive.
      for (let i = 0; i < 4; i++) spawn();
    }

    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) draw(performance.now(), 0);
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
      <canvas
        ref={canvasRef}
        className="h-full w-full [mask-image:radial-gradient(85%_75%_at_50%_45%,#000_35%,transparent_100%)]"
      />
      {/* keep the headline area calm so the type always reads first */}
      <div className="absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_42%,rgba(10,9,8,0.72)_0%,rgba(10,9,8,0)_100%)]" />
    </div>
  );
}
