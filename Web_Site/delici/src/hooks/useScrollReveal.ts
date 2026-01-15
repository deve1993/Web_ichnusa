"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = "-50px", once = true, delay = 0 } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return [ref, isVisible];
}

interface StaggeredRevealOptions {
  staggerDelay?: number;
  baseDelay?: number;
  threshold?: number;
}

export function useStaggeredReveal<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: StaggeredRevealOptions = {}
): [RefObject<T | null>, boolean[]] {
  const { staggerDelay = 100, baseDelay = 0, threshold = 0.1 } = options;
  const ref = useRef<T>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, baseDelay + i * staggerDelay);
          }
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [itemCount, staggerDelay, baseDelay, threshold]);

  return [ref, visibleItems];
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

interface ScrollDirectionReturn {
  direction: "up" | "down" | null;
  isScrolled: boolean;
  scrollY: number;
}

export function useScrollDirection(threshold: number = 10): ScrollDirectionReturn {
  const [scrollState, setScrollState] = useState<ScrollDirectionReturn>({
    direction: null,
    isScrolled: false,
    scrollY: 0,
  });
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction =
        currentScrollY > lastScrollY.current + threshold
          ? "down"
          : currentScrollY < lastScrollY.current - threshold
            ? "up"
            : scrollState.direction;

      setScrollState({
        direction,
        isScrolled: currentScrollY > 50,
        scrollY: currentScrollY,
      });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, scrollState.direction]);

  return scrollState;
}

export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
