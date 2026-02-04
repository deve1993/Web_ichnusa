"use client";

import { useRef, useEffect, ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = container.querySelectorAll(".text-reveal-word");
            revealElements.forEach((el, index) => {
              (el as HTMLElement).style.transitionDelay = `${delay + index * staggerDelay}s`;
              el.classList.add("revealed");
            });

            if (once) {
              observer.unobserve(container);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [delay, staggerDelay, once]);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden mr-[0.25em]">
          <span className="text-reveal-word inline-block">{word}</span>
        </span>
      ))}
    </span>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function CharReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
  once = true,
}: CharRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars = children.split("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = container.querySelectorAll(".text-reveal-char");
            revealElements.forEach((el, index) => {
              (el as HTMLElement).style.transitionDelay = `${delay + index * staggerDelay}s`;
              el.classList.add("revealed");
            });

            if (once) {
              observer.unobserve(container);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [delay, staggerDelay, once]);

  return (
    <span ref={containerRef} className={`inline-flex ${className}`}>
      {chars.map((char, index) => (
        <span key={index} className="overflow-hidden">
          <span className="text-reveal-char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function LineReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: LineRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElement = container.querySelector(".text-reveal-line");
            if (revealElement) {
              (revealElement as HTMLElement).style.transitionDelay = `${delay}s`;
              revealElement.classList.add("revealed");
            }

            if (once) {
              observer.unobserve(container);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [delay, once]);

  return (
    <span ref={containerRef} className={`overflow-hidden block ${className}`}>
      <span className="text-reveal-line block">{children}</span>
    </span>
  );
}

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  once = true,
}: SplitTextProps) {
  const lines = children.split("\n");

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <LineReveal key={index} delay={delay + index * 0.1} once={once}>
          {line}
        </LineReveal>
      ))}
    </span>
  );
}
