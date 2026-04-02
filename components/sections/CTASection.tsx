"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "words,chars" });
        gsap.fromTo(
          split.words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-40 px-6 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Organic bg blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,242,208,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(108,47,232,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 80% 20%, rgba(0,200,240,0.05) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Morphing blob shape */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          style={{
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(0,242,208,0.04) 0%, rgba(108,47,232,0.04) 50%, transparent 70%)",
            animation:
              "blob-morph 20s ease-in-out infinite, float-gentle 12s ease-in-out infinite",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Grid bg overlay */}
      <div
        className="absolute inset-0 grid-bg opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Tag */}
        <div className="tag-chip mx-auto mb-8 w-fit">Ready to Transform?</div>

        {/* Headline */}
        <h2
          ref={titleRef}
          className="font-display mb-6"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--c-text)",
          }}
        >
          Let&apos;s build something{" "}
          <span className="gradient-text">extraordinary</span>
        </h2>

        {/* Sub */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          <p
            className="mx-auto mb-10"
            style={{
              color: "var(--c-muted)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              maxWidth: "500px",
            }}
          >
            From AI integration to full-scale custom software — we turn
            ambitious ideas into shipped products. Let&apos;s talk about yours.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              className="btn-primary text-base px-10 py-5"
              range={120}
            >
              <span>Book a Discovery Call</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M8 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>

            <MagneticButton
              className="btn-ghost text-base px-8 py-5"
              range={80}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 5l6 4 6-4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <rect
                  x="1"
                  y="3"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
              <span>Send us a message</span>
            </MagneticButton>
          </div>

          {/* Trust row */}
          <div
            className="mt-14 pt-10 flex flex-wrap justify-center gap-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { icon: "⚡", text: "Response in 24h" },
              { icon: "🔒", text: "NDA on request" },
              { icon: "🌍", text: "Global clients" },
              { icon: "🤝", text: "Fixed-scope contracts" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span style={{ fontSize: "0.875rem" }}>{item.icon}</span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "rgba(180,200,255,0.4)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
