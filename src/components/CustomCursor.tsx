"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotInner = dotInnerRef.current;
    const ringInner = ringInnerRef.current;
    if (!dot || !ring || !dotInner || !ringInner) return;

    let isHovering = false;
    let isVisible = false;

    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        isVisible = true;
        dotInner.style.opacity = "1";
        ringInner.style.opacity = "1";
      }

      const target = e.target as HTMLElement;
      const clickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a,button,[role='button'],.cursor-pointer");

      if (clickable !== isHovering) {
        isHovering = clickable;
        dotInner.style.transform = `scale(${clickable ? 0.5 : 1})`;
        ringInner.style.transform = `scale(${clickable ? 1.5 : 1})`;
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dotInner.style.opacity = "0";
      ringInner.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dotInner.style.opacity = "1";
      ringInner.style.opacity = "1";
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.35);

      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      dot.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{ willChange: "transform" }}
      >
        <div
          ref={dotInnerRef}
          className="w-2 h-2 bg-[var(--color-primary)] rounded-full transition-transform duration-150"
          style={{ opacity: 0 }}
        />
      </div>

      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{ willChange: "transform" }}
      >
        <div
          ref={ringInnerRef}
          className="w-8 h-8 border border-[var(--color-primary)] rounded-full transition-transform duration-200"
          style={{ opacity: 0 }}
        />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `,
        }}
      />
    </>
  );
}
