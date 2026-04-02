"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const STEPS = [
  {
    num: "01",
    title: "Discovery Sprint",
    desc: "We map your business, uncover hidden inefficiencies, and identify high-impact opportunities in a focused 1-week sprint.",
    color: "#00F2D0",
  },
  {
    num: "02",
    title: "Architecture Design",
    desc: "Our engineers design a system blueprint — scalable, maintainable, and tailored to your exact operational model.",
    color: "#6C2FE8",
  },
  {
    num: "03",
    title: "Rapid Build",
    desc: "Agile 2-week cycles. Working software early and often. You see progress, not presentations.",
    color: "#00C8F0",
  },
  {
    num: "04",
    title: "AI Layer",
    desc: "Intelligent features embedded at every touchpoint — not bolted on as an afterthought.",
    color: "#9B6EFF",
  },
  {
    num: "05",
    title: "Launch & Scale",
    desc: "Monitored deployment, performance tuning, and ongoing iteration as you grow.",
    color: "#00F2D0",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  //   const dotRef     = useRef<SVGCircleElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Draw the connector line via scroll
      if (pathRef.current) {
        gsap.fromTo(
          pathRef.current,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 75%",
              end: "bottom 30%",
              scrub: 1,
            },
          },
        );
      }

      // Step cards cascade in
      const cards = stepsRef.current?.querySelectorAll(".process-step");
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      // Morphing shape scroll scrub
      const shapeEl = document.getElementById("morph-shape");
      if (shapeEl) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const hue = 160 + p * 80;
            (shapeEl as HTMLElement).style.filter = `hue-rotate(${hue}deg)`;
            (shapeEl as HTMLElement).style.transform =
              `rotate(${p * 120}deg) scale(${0.8 + p * 0.4})`;
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,242,208,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Title + steps */}
          <div>
            <div ref={titleRef} style={{ opacity: 0 }}>
              <div className="tag-chip mb-5">How We Work</div>
              <h2
                className="font-display mb-6"
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--c-text)",
                }}
              >
                From idea to <span className="gradient-text">live product</span>
                <br />
                in weeks
              </h2>
              <p
                style={{
                  color: "var(--c-muted)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  maxWidth: "380px",
                }}
              >
                A battle-tested delivery process that eliminates waste,
                compresses timelines, and ships quality software at speed.
              </p>
            </div>

            {/* Steps */}
            <div ref={stepsRef} className="mt-12 relative">
              {/* Vertical connector line */}
              <div
                className="absolute left-5.5 top-0 bottom-0 w-px pointer-events-none"
                style={{ background: "rgba(0,242,208,0.08)" }}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-0">
                {STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="process-step relative flex gap-6 pb-10 last:pb-0"
                    style={{ opacity: 0 }}
                  >
                    {/* Number circle */}
                    <div
                      className="shrink-0 relative z-10 w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}35`,
                        color: step.color,
                        boxShadow: `0 0 16px ${step.color}20`,
                      }}
                    >
                      <span className="font-mono text-xs font-medium">
                        {step.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-2">
                      <h3
                        className="font-display mb-2"
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          color: "var(--c-text)",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--c-muted)",
                          fontSize: "0.875rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Morphing animated shape */}
          <div className="hidden lg:flex items-center justify-center sticky top-1/3">
            <div className="relative w-96 h-96">
              {/* Glow rings */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,242,208,0.08) 0%, transparent 70%)",
                  animation: "pulse-glow 4s ease-in-out infinite",
                }}
                aria-hidden="true"
              />

              {/* Main morphing polygon */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="shapeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00F2D0" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#6C2FE8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00F2D0" stopOpacity="0.4" />
                  </linearGradient>

                  <filter id="glow-filter">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="170"
                  fill="none"
                  stroke="rgba(0,242,208,0.06)"
                  strokeWidth="1"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="rgba(0,242,208,0.04)"
                  strokeWidth="1"
                />

                {/* Animated connector path */}
                <path
                  ref={pathRef}
                  d="M200,60 C280,80 340,140 340,200 C340,280 280,340 200,340 C120,340 60,280 60,200 C60,140 120,80 200,60"
                  fill="none"
                  stroke="url(#shapeGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  style={{ filter: "url(#glow-filter)" }}
                />

                {/* Central morphing shape */}
                <g
                  id="morph-shape"
                  style={{
                    transformOrigin: "200px 200px",
                    transition: "filter 0.5s",
                  }}
                >
                  <polygon
                    points="200,80 280,150 260,250 140,250 120,150"
                    fill="url(#shapeGrad)"
                    fillOpacity="0.15"
                    stroke="url(#shapeGrad)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="200,100 265,160 248,240 152,240 135,160"
                    fill="none"
                    stroke="rgba(0,242,208,0.3)"
                    strokeWidth="0.5"
                  />
                </g>

                {/* Node dots */}
                {[
                  [200, 60],
                  [340, 200],
                  [200, 340],
                  [60, 200],
                  [290, 120],
                  [290, 280],
                  [110, 280],
                  [110, 120],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="var(--c-cyan)"
                    fillOpacity={0.5 + (i % 3) * 0.15}
                    style={{
                      animation: `pulse-glow ${2 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}

                {/* Center dot */}
                <circle
                  cx="200"
                  cy="200"
                  r="6"
                  fill="var(--c-cyan)"
                  fillOpacity="0.8"
                  style={{
                    filter: "url(#glow-filter)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                  }}
                />
                <circle cx="200" cy="200" r="3" fill="white" />
              </svg>

              {/* Floating stat chips */}
              <div
                className="absolute -top-2 -right-4 glass rounded-xl px-3 py-2"
                style={{
                  border: "1px solid rgba(0,242,208,0.15)",
                  animation: "float-gentle 6s ease-in-out infinite",
                }}
              >
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--c-cyan)" }}
                >
                  Avg. Delivery
                </p>
                <p
                  className="font-display font-bold text-sm"
                  style={{ color: "var(--c-text)" }}
                >
                  3–5 Weeks
                </p>
              </div>

              <div
                className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2"
                style={{
                  border: "1px solid rgba(108,47,232,0.2)",
                  animation: "float-gentle 8s ease-in-out infinite reverse",
                }}
              >
                <p className="font-mono text-xs" style={{ color: "#9B6EFF" }}>
                  Success Rate
                </p>
                <p
                  className="font-display font-bold text-sm"
                  style={{ color: "var(--c-text)" }}
                >
                  98%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
