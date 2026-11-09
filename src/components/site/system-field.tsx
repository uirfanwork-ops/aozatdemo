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

    // The "O": a large open ring behind the headline, gapped at one o'clock like the logo.
    const GAP_CENTER = -Math.PI / 3;
    const GAP = 0.55;
    const ARC_START = GAP_CENTER + GAP / 2; // clockwise from here...
    const ARC_LEN = Math.PI * 2 - GAP; // ...to the other side of the gap
    let ring = { cx: 0, cy: 0, R: 0 };
    let anchors: number[] = []; // node indices sitting on the ring
    let lap = 0; // 0..1 progress of the light around the ring
    let lastLap = 0;
    let dotFlare = 0;
    const photo = new Image();
    photo.src = "/images/hero-site-dusk.jpg";
    photo.onload = () => {
      if (reduce) draw(performance.now(), 0);
    };

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
      // centred on the headline and subhead, kept clear of the navigation bar
      const R = Math.min(w * (w < 640 ? 0.44 : 0.3), h * 0.37);
      ring = { cx: w / 2, cy: Math.max(h * 0.52, R + 110), R };
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() < 0.22) continue; // leave gaps so it reads as a network, not a grid
          const x = (c + 0.5) * cw + (rand() - 0.5) * cw * 0.7;
          const y = (r + 0.5) * rh + (rand() - 0.5) * rh * 0.7;
          const r0 = 1.4 + rand() * 1.4;
          const ph = rand() * Math.PI * 2;
          // keep the inside of the O clear, and a little breathing room around its line
          const d = Math.hypot(x - ring.cx, y - ring.cy);
          if (d < ring.R * 1.12) continue;
          nodes.push({ x, y, r: r0, glow: 0, phase: ph });
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
      // Anchors on the ring, each wired out to the nearest network node.
      const gridCount = nodes.length;
      anchors = [];
      const count = w < 640 ? 6 : 9;
      for (let k = 0; k < count; k++) {
        const a = ARC_START + ((k + 0.5) / count) * ARC_LEN;
        const idx = nodes.length;
        nodes.push({
          x: ring.cx + Math.cos(a) * ring.R,
          y: ring.cy + Math.sin(a) * ring.R,
          r: 2,
          glow: 0,
          phase: k,
        });
        neighbours.push([]);
        anchors.push(idx);
        let best = -1;
        let bestD = Infinity;
        for (let j = 0; j < gridCount; j++) {
          const dd = Math.hypot(nodes[j].x - nodes[idx].x, nodes[j].y - nodes[idx].y);
          if (dd < bestD) {
            bestD = dd;
            best = j;
          }
        }
        if (best >= 0 && bestD < Math.max(cw, rh) * 1.8) {
          links.push([idx, best]);
          neighbours[idx].push(best);
          neighbours[best].push(idx);
        }
      }
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

    function drawRing(t: number, dt: number) {
      const { cx, cy, R } = ring;
      if (!R) return;

      // a wider, very faint dashed orbit turning slowly
      ctx!.save();
      ctx!.setLineDash([2, 10]);
      ctx!.lineDashOffset = -t * 6;
      ctx!.strokeStyle = "rgba(236,231,223,0.06)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();

      // --- instrument layers around the O ---

      // radar sweep: a soft warm wedge turning inside the ring
      const cg = (ctx as CanvasRenderingContext2D & {
        createConicGradient?: (a: number, x: number, y: number) => CanvasGradient;
      }).createConicGradient;
      if (cg) {
        const sweep = t * 0.45;
        const g = cg.call(ctx, sweep, cx, cy);
        g.addColorStop(0, "rgba(243,112,33,0.16)");
        g.addColorStop(0.09, "rgba(243,112,33,0)");
        g.addColorStop(1, "rgba(243,112,33,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(cx, cy, R * 0.97, 0, Math.PI * 2);
        ctx!.fill();
      }

      // dial ticks just inside the O, turning slowly; every tenth one is longer
      const ticks = 120;
      const rot = t * 0.02;
      ctx!.lineWidth = 1;
      for (let i = 0; i < ticks; i++) {
        const a = rot + (i / ticks) * Math.PI * 2;
        const major = i % 10 === 0;
        const r1 = R * 0.9;
        const r0 = r1 - (major ? 9 : 4);
        ctx!.strokeStyle = major ? "rgba(236,231,223,0.38)" : "rgba(236,231,223,0.15)";
        ctx!.beginPath();
        ctx!.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
        ctx!.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx!.stroke();
      }

      // counter-rotating segmented arcs
      const seg = (radius: number, spin: number, parts: [number, number][], color: string, width: number) => {
        ctx!.strokeStyle = color;
        ctx!.lineWidth = width;
        for (const [start, len] of parts) {
          ctx!.beginPath();
          ctx!.arc(cx, cy, radius, spin + start, spin + start + len);
          ctx!.stroke();
        }
      };
      seg(R * 1.08, -t * 0.12, [[0, 0.9], [2.1, 0.45], [3.7, 0.22], [4.6, 0.7]], "rgba(243,140,50,0.45)", 1.6);
      seg(R * 0.8, t * 0.18, [[0.4, 0.6], [2.9, 1.1], [5.1, 0.3]], "rgba(236,231,223,0.2)", 1);

      // alignment brackets at the four compass points of the outer orbit
      ctx!.strokeStyle = "rgba(236,231,223,0.35)";
      ctx!.lineWidth = 1;
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2;
        const ox = cx + Math.cos(a) * R * 1.22;
        const oy = cy + Math.sin(a) * R * 1.22;
        const nx = Math.cos(a);
        const ny = Math.sin(a);
        ctx!.beginPath();
        ctx!.moveTo(ox - nx * 7, oy - ny * 7);
        ctx!.lineTo(ox + nx * 7, oy + ny * 7);
        ctx!.moveTo(ox - ny * 4, oy + nx * 4);
        ctx!.lineTo(ox + ny * 4, oy - nx * 4);
        ctx!.stroke();
      }

      // the O itself: a main line with a faint second rail
      ctx!.lineCap = "round";
      ctx!.strokeStyle = "rgba(236,231,223,0.28)";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, ARC_START, ARC_START + ARC_LEN);
      ctx!.stroke();
      ctx!.strokeStyle = "rgba(236,231,223,0.12)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R + 5, ARC_START, ARC_START + ARC_LEN);
      ctx!.stroke();
      ctx!.lineCap = "butt";

      // light travelling round the O, about one lap every eight seconds
      lap = (lap + dt / 8) % 1;
      if (lap < lastLap) dotFlare = 1; // reached the gap: the dot lights up
      lastLap = lap;
      const head = ARC_START + lap * ARC_LEN;
      const trail = Math.min(1.5, lap * ARC_LEN);
      ctx!.globalCompositeOperation = "lighter";
      const steps = 36;
      for (let i = 0; i < steps; i++) {
        const a0 = head - (trail * (i + 1)) / steps;
        const a1 = head - (trail * i) / steps;
        const alpha = 0.75 * Math.pow(1 - i / steps, 2);
        ctx!.strokeStyle = `rgba(250,${150 + Math.round(40 * (1 - i / steps))},64,${alpha})`;
        ctx!.lineWidth = 2.6;
        ctx!.beginPath();
        ctx!.arc(cx, cy, R, a0, a1);
        ctx!.stroke();
      }
      const hx = cx + Math.cos(head) * R;
      const hy = cy + Math.sin(head) * R;
      glowDot(hx, hy, 30, AMBER, 0.5);
      glowDot(hx, hy, 3.5, [255, 230, 190], 1);

      // the light wakes each anchor it passes and sends work out into the network
      for (const idx of anchors) {
        const n = nodes[idx];
        const a = Math.atan2(n.y - cy, n.x - cx);
        let rel = a - ARC_START;
        while (rel < 0) rel += Math.PI * 2;
        const pos = rel / ARC_LEN;
        if (Math.abs(pos - lap) < dt / 8 + 0.002) {
          n.glow = 1;
          if (!reduce && Math.random() < 0.7) spawn(idx, 1);
        }
      }

      // the orange dot sitting in the gap, as in the logo
      dotFlare = Math.max(0, dotFlare - dt * 0.7);
      const dx = cx + Math.cos(GAP_CENTER) * R;
      const dy = cy + Math.sin(GAP_CENTER) * R;
      const breathe = 0.5 + 0.5 * Math.sin(t * 1.4);
      glowDot(dx, dy, 34 + 30 * dotFlare, WARM, 0.28 + 0.12 * breathe + 0.35 * dotFlare);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "rgba(243,112,33,0.9)";
      ctx!.beginPath();
      ctx!.arc(dx, dy, Math.max(5, R * 0.035), 0, Math.PI * 2);
      ctx!.fill();
    }

    function draw(now: number, dt: number) {
      const t = now / 1000;
      ctx!.fillStyle = "#0a0908";
      ctx!.fillRect(0, 0, w, h);
      if (photo.complete && photo.naturalWidth) {
        // cover-fit, anchored low, with a slow 40-second drift
        const drift = reduce ? 0 : Math.sin((t / 40) * Math.PI);
        const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight) * (1.07 + 0.03 * drift);
        const iw = photo.naturalWidth * scale;
        const ih = photo.naturalHeight * scale;
        const ix = (w - iw) / 2 + drift * w * 0.01;
        const iy = (h - ih) * 0.6 - drift * h * 0.008;
        ctx!.globalAlpha = 0.3;
        ctx!.drawImage(photo, ix, iy, iw, ih);
        ctx!.globalAlpha = 1;
        // darken top and bottom, vignette the edges
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

      // Two slow warm glows drifting underneath everything.
      ctx!.globalCompositeOperation = "lighter";
      glowDot(w * (0.3 + 0.12 * Math.sin(t * 0.07)), h * (0.42 + 0.1 * Math.cos(t * 0.05)), Math.max(w, h) * 0.38, WARM, 0.07);
      glowDot(w * (0.72 + 0.1 * Math.cos(t * 0.06)), h * (0.58 + 0.12 * Math.sin(t * 0.08)), Math.max(w, h) * 0.32, AMBER, 0.05);
      ctx!.globalCompositeOperation = "source-over";

      drawRing(t, dt);

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
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* keep the headline area calm so the type always reads first */}
      <div className="absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_42%,rgba(10,9,8,0.5)_0%,rgba(10,9,8,0)_100%)]" />
    </div>
  );
}
