"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TYPED_PHRASES = [
  "AI Integration",
  "Smart Automation",
  "Custom ERP & Web",
  "Digital Growth",
  "AI Avatar Clones",
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const phrase = TYPED_PHRASES[phraseIdx];

      if (!deleting) {
        charIdx++;
        el.textContent = phrase.slice(0, charIdx);

        if (charIdx === phrase.length) {
          timeout = setTimeout(() => {
            deleting = true;
            type();
          }, 2200);
          return;
        }
      } else {
        charIdx--;
        el.textContent = phrase.slice(0, charIdx);

        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % TYPED_PHRASES.length;
        }
      }

      timeout = setTimeout(type, deleting ? 45 : 80);
    };

    timeout = setTimeout(type, 1400);
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      // ── Entrance Timeline ───────────────────────────────────
      const tl = gsap.timeline({ delay: 0.2 });

      // Tag chip
      tl.fromTo(
        tagRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
      );

      // Split heading into characters
      if (headRef.current) {
        const split = new SplitText(headRef.current, { type: "chars,words" });
        tl.fromTo(
          split.chars,
          { y: 80, opacity: 0, rotationX: -40 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.025,
          },
          "-=0.4",
        );
      }

      tl.fromTo(
        subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
        "-=0.5",
      );

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
        "-=0.5",
      );

      tl.fromTo(
        scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2",
      );

      // ── Blob Float ──────────────────────────────────────────
      gsap.to(blob1Ref.current, {
        y: -30,
        x: 15,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(blob2Ref.current, {
        y: 20,
        x: -20,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // ── Kinetic Variable Font on Scroll ─────────────────────
      // Maps scroll velocity → font-weight (400–800) and letter-spacing
      let lastScroll = 0;
      let velocity = 0;
      let currentWeight = 700;

      const onScroll = () => {
        velocity = Math.abs(window.scrollY - lastScroll);
        lastScroll = window.scrollY;
        const target = Math.min(800, 700 + velocity * 6);

        // Smooth interpolation
        currentWeight += (target - currentWeight) * 0.2;

        if (headRef.current) {
          headRef.current.style.fontVariationSettings = `'wght' ${Math.round(currentWeight)}`;
          headRef.current.style.letterSpacing = `${-0.04 + velocity * -0.003}em`;
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Parallax layers ─────────────────────────────────────
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(headRef.current, { y: p * 80 });
          gsap.set(subRef.current, { y: p * 50 });
          gsap.set(blob1Ref.current, { y: p * -120 });
          gsap.set(blob2Ref.current, { y: p * -80 });
        },
      });

      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: heroRef },
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      style={{ zIndex: 1 }}
    >
      {/* Decorative orbs */}
      <div
        ref={blob1Ref}
        className="absolute pointer-events-none"
        style={{
          right: "-5%",
          top: "10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(108,47,232,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "blob-morph 16s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        ref={blob2Ref}
        className="absolute pointer-events-none"
        style={{
          left: "-8%",
          bottom: "15%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(0,242,208,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob-morph 20s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Tag chip */}
        <div
          ref={tagRef}
          className="flex justify-center mb-8"
          style={{ opacity: 0 }}
        >
          <div className="tag-chip">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="3" fill="var(--c-cyan)" />
            </svg>
            Next-Gen IT Services
          </div>
        </div>

        {/* Main headline */}
        <h1
          ref={headRef}
          className="font-display gradient-text"
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontVariationSettings: "'wght' 700",
            willChange: "font-variation-settings, letter-spacing",
            perspective: "1000px",
          }}
        >
          Build the Future
          <br />
          <span
            style={{
              color: "var(--c-text)",
              WebkitTextFillColor: "var(--c-text)",
            }}
          >
            with{" "}
          </span>
          <span className="gradient-text">Intelligence</span>
        </h1>

        {/* Typewriter sub-headline */}
        <p
          ref={subRef}
          className="mt-6 font-display"
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            color: "var(--c-muted)",
            letterSpacing: "-0.01em",
            minHeight: "2em",
            opacity: 0,
          }}
        >
          Grow your business with{" "}
          <span style={{ color: "var(--c-text)", fontWeight: 600 }}>
            meggma
          </span>{" "}
          ·{" "}
          <span
            ref={typedRef}
            className="gradient-text-2"
            style={{ fontWeight: 700, borderRight: "2px solid var(--c-cyan)" }}
          />
        </p>

        {/* Descriptor line */}
        <p
          className="mt-4 mx-auto font-mono text-xs tracking-widest uppercase"
          style={{ color: "rgba(180,200,255,0.35)", maxWidth: "400px" }}
        >
          AI Integration · Automation · Custom Software · Digital Strategy
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          style={{ opacity: 0 }}
        >
          <MagneticButton
            className="btn-primary text-base px-8 py-4"
            range={100}
          >
            <span>Start Your Journey</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M8 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>

          <MagneticButton className="btn-ghost text-base px-8 py-4" range={80}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path d="M6.5 6l3 2-3 2V6z" fill="currentColor" />
            </svg>
            <span>See Our Work</span>
          </MagneticButton>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {[
            "50+ Projects",
            "98% Satisfaction",
            "AI-First Approach",
            "24/7 Support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 font-mono text-xs"
              style={{ color: "rgba(180,200,255,0.4)" }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--c-cyan)" }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "rgba(180,200,255,0.3)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 relative overflow-hidden rounded-full"
          style={{ background: "rgba(0,242,208,0.15)" }}
        >
          <div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              height: "40%",
              background: "var(--c-cyan)",
              animation: "scan-line 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
