"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Color palette: deep indigo bg + cyan + violet + electric blue
    const nodes: Node[] = [
      {
        x: 0.15,
        y: 0.25,
        vx: 0.00018,
        vy: 0.00012,
        radius: 0.55,
        r: 0,
        g: 242,
        b: 208,
        alpha: 0.55,
      },
      {
        x: 0.78,
        y: 0.65,
        vx: -0.00015,
        vy: 0.0002,
        radius: 0.65,
        r: 108,
        g: 47,
        b: 232,
        alpha: 0.6,
      },
      {
        x: 0.5,
        y: 0.1,
        vx: 0.0001,
        vy: -0.00018,
        radius: 0.45,
        r: 0,
        g: 120,
        b: 255,
        alpha: 0.45,
      },
      {
        x: 0.88,
        y: 0.85,
        vx: -0.00022,
        vy: -0.0001,
        radius: 0.5,
        r: 155,
        g: 110,
        b: 255,
        alpha: 0.5,
      },
      {
        x: 0.05,
        y: 0.85,
        vx: 0.00014,
        vy: -0.00022,
        radius: 0.4,
        r: 0,
        g: 200,
        b: 180,
        alpha: 0.4,
      },
    ];

    let animId: number;
    let time = 0;

    const draw = () => {
      time += 0.002;

      // Fade background each frame
      ctx.fillStyle = "rgba(3, 6, 26, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "screen";

      for (const n of nodes) {
        // Slightly oscillate velocity for organic feel
        n.x += n.vx + Math.sin(time * 0.7 + n.r * 0.01) * 0.00005;
        n.y += n.vy + Math.cos(time * 0.5 + n.g * 0.01) * 0.00005;

        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.x = Math.max(0, Math.min(1, n.x));
        n.y = Math.max(0, Math.min(1, n.y));

        const cx = n.x * canvas.width;
        const cy = n.y * canvas.height;
        const r = n.radius * Math.max(canvas.width, canvas.height) * 0.6;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${n.alpha})`);
        grad.addColorStop(0.4, `rgba(${n.r},${n.g},${n.b},${n.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${n.r},${n.g},${n.b},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(draw);
    };

    // Black base
    ctx.fillStyle = "#03061A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
