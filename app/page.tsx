"use client";

import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AuroraCanvas from "@/components/ui/AuroraCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  // ── Lenis Smooth Scroll + GSAP ScrollTrigger sync ──────
  useEffect(() => {
    let lenis: import("lenis").default;

    const init = async () => {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      // Sync GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    init();
    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(() => {});
      }
    };
  }, []);

  // ── Page load reveal ────────────────────────────────────
  useGSAP(() => {
    // Fade in the main content on load
    gsap.fromTo(
      "main",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 },
    );
  }, []);

  return (
    <>
      {/* Global overlays */}
      <CustomCursor />
      <AuroraCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Page content */}
      <main style={{ opacity: 0, position: "relative", zIndex: 1 }}>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
