"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "growth",
    icon: <GrowthIcon />,
    label: "01",
    title: "Digital Growth",
    tagline: "Scale with Meggma",
    desc: "End-to-end digital strategy that transforms your online presence into a measurable revenue engine. SEO, performance marketing, conversion optimization, and brand positioning at scale.",
    tags: ["Strategy", "SEO", "CRO"],
    accent: "#00F2D0",
  },
  {
    id: "ai",
    icon: <AIIcon />,
    label: "02",
    title: "AI Integration",
    tagline: "Intelligent Operations",
    desc: "Embed large language models, computer vision, and predictive analytics directly into your daily workflows. Cut manual overhead and unlock intelligent decision-making across every department.",
    tags: ["LLMs", "Computer Vision", "Analytics"],
    accent: "#9B6EFF",
  },
  {
    id: "automation",
    icon: <AutomationIcon />,
    label: "03",
    title: "Hyper-Automation",
    tagline: "Zero Repetitive Work",
    desc: "Map, diagnose, and automate every repetitive process in your organization. From document handling to customer workflows — if it can be automated, we automate it.",
    tags: ["RPA", "Workflows", "Integrations"],
    accent: "#00C8F0",
  },
  {
    id: "software",
    icon: <SoftwareIcon />,
    label: "04",
    title: "Custom ERP & Web",
    tagline: "Built For You, Exactly",
    desc: "Bespoke ERP platforms and high-performance websites crafted to your exact specifications. No bloated templates — clean architecture, elegant UI, and total ownership.",
    tags: ["ERP", "Web Dev", "UI/UX"],
    accent: "#6C2FE8",
  },
  {
    id: "avatar",
    icon: <AvatarIcon />,
    label: "05",
    title: "AI Avatar Clone",
    tagline: "Stream Without Limits",
    desc: "Create a hyper-realistic digital twin of yourself for live streaming, content creation, or virtual meetings. Your voice, your face, your persona — powered by generative AI.",
    tags: ["Generative AI", "Streaming", "Voice AI"],
    accent: "#FF6B9D",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger
      const cards = gridRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Organic top divider */}
      <OrgDivider />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(108,47,232,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="mb-20" style={{ opacity: 0 }}>
          <div className="tag-chip mb-5">
            <span>What We Build</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display gradient-text"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                maxWidth: "600px",
              }}
            >
              Services that
              <br />
              <span
                style={{
                  color: "var(--c-text)",
                  WebkitTextFillColor: "var(--c-text)",
                }}
              >
                move the needle
              </span>
            </h2>

            <p
              className="max-w-xs"
              style={{
                color: "var(--c-muted)",
                fontSize: "1rem",
                lineHeight: 1.65,
              }}
            >
              Every solution is precision-engineered for your business model —
              not a template, not a package.
            </p>
          </div>
        </div>

        {/* Services grid — organic asymmetric layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`service-card shimmer-card group cursor-none ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${i === 3 ? "lg:col-span-2" : ""}`}
              style={{ opacity: 0 }}
            >
              <ServiceCard service={s} wide={i === 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service: s,
  wide,
}: {
  service: (typeof SERVICES)[0];
  wide?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !glowRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(300px at ${x}px ${y}px, ${s.accent}18, transparent 70%)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glass relative rounded-[23px] overflow-hidden h-full transition-transform duration-500 ease-out group-hover:scale-[1.01]`}
      style={{
        padding: wide ? "2.5rem" : "2rem",
        minHeight: "280px",
      }}
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[23px] pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      <div
        className={`relative z-10 flex ${wide ? "flex-row gap-10 items-start" : "flex-col gap-5"}`}
      >
        {/* Icon + number */}
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `${s.accent}12`,
              border: `1px solid ${s.accent}25`,
              color: s.accent,
              boxShadow: `0 0 20px ${s.accent}15`,
              transition: "box-shadow 0.3s",
            }}
          >
            {s.icon}
          </div>

          {!wide && (
            <span
              className="font-mono text-xs pt-1"
              style={{ color: "rgba(180,200,255,0.25)" }}
            >
              {s.label}
            </span>
          )}
        </div>

        {/* Text content */}
        <div className={wide ? "flex-1" : ""}>
          <p
            className="font-mono text-xs mb-1 tracking-widest uppercase"
            style={{ color: s.accent, opacity: 0.7 }}
          >
            {s.tagline}
          </p>

          <h3
            className="font-display mb-3 transition-colors duration-300"
            style={{
              fontSize: wide ? "1.75rem" : "1.35rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--c-text)",
            }}
          >
            {s.title}
          </h3>

          <p
            style={{
              color: "var(--c-muted)",
              fontSize: "0.9rem",
              lineHeight: 1.65,
            }}
          >
            {s.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {s.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: `${s.accent}08`,
                  border: `1px solid ${s.accent}20`,
                  color: s.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow CTA */}
          <div
            className="mt-5 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: s.accent }}
          >
            <span>Learn More</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SVG Icons ──────────────────────────────────────────────── */
function GrowthIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
    </svg>
  );
}

function SoftwareIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3M13 14h4" />
    </svg>
  );
}

function AvatarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      <path d="M17 8c1.5.5 2.5 2 2.5 3.5" />
      <path d="M16 3.5c1 .8 1.7 2 1.7 3.5" />
    </svg>
  );
}

function OrgDivider() {
  return (
    <div
      className="absolute top-0 left-0 right-0 overflow-hidden leading-none"
      style={{ height: "80px" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
          style={{ fill: "var(--c-bg)" }}
        />
      </svg>
    </div>
  );
}
