"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection for nav transformation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 },
    );
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
      style={{ opacity: 0 }}
    >
      <nav
        className={`
          glass flex items-center gap-2 transition-all duration-500
          ${scrolled ? "px-3 py-2 gap-1 rounded-2xl" : "px-5 py-3 rounded-full"}
        `}
        style={{
          border: "1px solid rgba(0,242,208,0.12)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,242,208,0.06)"
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 mr-4 group"
          aria-label="Meggma home"
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #00F2D0, #6C2FE8)",
                boxShadow: "0 0 16px rgba(0,242,208,0.4)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display font-black text-sm"
                style={{ color: "#03061A", letterSpacing: "-0.05em" }}
              >
                M
              </span>
            </div>
          </div>

          <span
            className={`font-display font-bold transition-all duration-300 ${scrolled ? "text-sm" : "text-base"}`}
            style={{ letterSpacing: "-0.03em", color: "var(--c-text)" }}
          >
            meggma
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`
                  relative font-medium transition-all duration-200 rounded-full
                  hover:text-(--c-cyan) group
                  ${scrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}
                `}
                style={{ color: "var(--c-muted)" }}
              >
                {link.label}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-4 transition-all duration-300 rounded-full"
                  style={{ background: "var(--c-cyan)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="ml-3 hidden md:block">
          <MagneticButton
            className={`btn-primary transition-all duration-300 ${scrolled ? "text-xs px-4 py-2" : "text-sm"}`}
            range={70}
          >
            <span>Get Started</span>
            <ArrowIcon />
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden ml-2 p-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={`w-4 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-0.75" : ""}`}
            style={{ background: "var(--c-text)" }}
          />
          <div
            className={`w-4 h-px mt-1 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-0.75" : ""}`}
            style={{ background: "var(--c-text)" }}
          />
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="absolute top-full mt-2 glass rounded-2xl px-4 py-4 w-56"
          style={{ border: "1px solid rgba(0,242,208,0.12)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-medium"
              style={{ color: "var(--c-muted)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            className="btn-primary w-full mt-3 justify-center text-sm"
            range={50}
          >
            Get Started
          </MagneticButton>
        </div>
      )}
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7h10M7 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
