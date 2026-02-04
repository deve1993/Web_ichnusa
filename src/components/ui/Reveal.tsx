"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface RevealProps {
  children: ReactNode;
  /** Animation direction. Default: "up" */
  direction?: Direction;
  /** Delay in seconds (CSS transition-delay). Default: 0 */
  delay?: number;
  /** Extra className forwarded to wrapper div */
  className?: string;
  /** Render as a different element. Default: "div" */
  as?: "div" | "span" | "section";
}

/**
 * Lightweight reveal-on-scroll wrapper.
 * Uses IntersectionObserver + CSS transitions instead of framer-motion.
 * ~0.4 kB vs ~45 kB for framer-motion.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as any}
      data-reveal={shown ? "shown" : "hidden"}
      data-reveal-dir={direction}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
