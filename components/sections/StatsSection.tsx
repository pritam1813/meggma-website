"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    mono: "PROJECTS_COUNT",
    color: "#00F2D0",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    mono: "SAT_RATE",
    color: "#9B6EFF",
  },
  {
    value: 3,
    suffix: "x",
    label: "Avg. ROI Achieved",
    mono: "ROI_MULTIPLIER",
    color: "#00C8F0",
  },
  {
    value: 12,
    suffix: "ms",
    label: "Avg. API Latency",
    mono: "API_LATENCY",
    color: "#6C2FE8",
  },
];

const TICKER_ITEMS = [
  "AI Integration",
  "Custom ERP",
  "Process Automation",
  "Digital Growth",
  "AI Avatar",
  "Web Development",
  "Data Analytics",
  "Cloud Architecture",
  "LLM Deployment",
  "UI/UX Design",
  "API Development",
  "DevOps & CI/CD",
];

function useCountUp(target: number, duration = 2, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCard({
  stat,
  animate,
}: {
  stat: (typeof STATS)[0];
  animate: boolean;
}) {
  const count = useCountUp(stat.value, 2, animate);

  return (
    <div
      className="glass relative rounded-2xl p-6 overflow-hidden group"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-30"
        style={{
          background: `radial-gradient(circle at top right, ${stat.color}40, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Mono label */}
      <div
        className="font-mono text-xs mb-4 tracking-widest"
        style={{ color: "rgba(180,200,255,0.3)" }}
      >
        {`> ${stat.mono}`}
      </div>

      {/* Value */}
      <div
        className="font-display"
        style={{
          fontSize: "3.5rem",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: stat.color,
          textShadow: `0 0 30px ${stat.color}50`,
        }}
      >
        {count}
        <span style={{ fontSize: "2rem" }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <p
        className="mt-3 text-sm font-medium"
        style={{ color: "var(--c-muted)" }}
      >
        {stat.label}
      </p>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{
          background: `linear-gradient(90deg, ${stat.color}, transparent)`,
        }}
      />
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => setAnimate(true),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,242,208,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Stats grid */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="tag-chip mb-6 w-fit">By the Numbers</div>

        <h2
          className="font-display mb-12"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--c-text)",
            maxWidth: "500px",
          }}
        >
          Results that{" "}
          <span className="gradient-text">speak for themselves</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.mono} stat={stat} animate={animate} />
          ))}
        </div>
      </div>

      {/* ── Ticker Belt ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-5"
        style={{
          borderTop: "1px solid rgba(0,242,208,0.06)",
          borderBottom: "1px solid rgba(0,242,208,0.06)",
        }}
      >
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, var(--c-bg), transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(-90deg, var(--c-bg), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="flex items-center gap-4 shrink-0"
            >
              <span
                className="font-display font-semibold text-sm tracking-tight whitespace-nowrap"
                style={{ color: "rgba(180,200,255,0.35)" }}
              >
                {item}
              </span>
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: "var(--c-cyan)", opacity: 0.5 }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
