"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): [RefObject<T | null>, { y: number }] {
  const { speed = 0.5, direction = "up", disabled = false } = options;
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      const parallaxOffset = distanceFromCenter * speed;

      setOffset(direction === "up" ? -parallaxOffset : parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction, disabled]);

  return [ref, { y: offset }];
}

export function useParallaxImage<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
): [RefObject<T | null>, { transform: string }] {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState("translateY(0px)");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const yPos = (scrolled - elementTop + windowHeight) * speed;
        setTransform(`translateY(${yPos}px)`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return [ref, { transform }];
}

interface MouseParallaxOptions {
  strength?: number;
  disabled?: boolean;
}

export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(
  options: MouseParallaxOptions = {}
): [RefObject<T | null>, { x: number; y: number }] {
  const { strength = 20, disabled = false } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      setPosition({
        x: deltaX * strength,
        y: deltaY * strength,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, disabled]);

  return [ref, position];
}
