"use client";

import { useRef, useCallback, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  range?: number;
  as?: "button" | "a";
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
  range = 90,
  as: Tag = "button",
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const isHovering = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const inZone = dist < range;

      if (inZone) {
        if (!isHovering.current) isHovering.current = true;
        const factor = (range - dist) / range;
        gsap.to(btn, {
          x: dx * strength * factor,
          y: dy * strength * factor,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      } else if (isHovering.current) {
        isHovering.current = false;
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
        });
      }
    },
    [strength, range],
  );

  useGSAP(
    () => {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { dependencies: [handleMouseMove] },
  );

  const props = {
    ref: btnRef,
    className: `magnetic-btn ${className}`,
    onClick,
    ...(Tag === "a" ? { href } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
