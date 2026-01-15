"use client";

import { useState, useEffect, useRef } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

// Easing functions
export const easings = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  easing = easings.easeOut,
  decimals = 0,
  prefix = "",
  suffix = "",
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const countRef = useRef(start);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startCounting = () => {
    setIsComplete(false);
    countRef.current = start;
    setCount(start);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const currentValue = start + (end - start) * easedProgress;
      countRef.current = currentValue;
      setCount(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    if (delay > 0) {
      setTimeout(() => {
        frameRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      frameRef.current = requestAnimationFrame(animate);
    }
  };

  const reset = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setCount(start);
    countRef.current = start;
    setIsComplete(false);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;
  const rawCount = Number(count.toFixed(decimals));

  return {
    count: rawCount,
    formattedCount,
    isComplete,
    startCounting,
    reset,
  };
}

// Hook for counter that starts when element is in view
export function useCounterOnView(options: UseCounterOptions) {
  const { startCounting, ...rest } = useCounter(options);
  const elementRef = useRef<HTMLElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            startCounting();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [startCounting]);

  return {
    ref: elementRef,
    startCounting,
    ...rest,
  };
}


