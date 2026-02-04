'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SardegnaDecorationProps {
  className?: string;
  opacity?: number;
  parallax?: boolean;
  parallaxIntensity?: number;
  delay?: number;
}

export function SardegnaDecoration({ 
  className, 
  opacity = 0.15,
  parallax = true,
  parallaxIntensity = 50,
  delay = 0,
}: SardegnaDecorationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [yOffset, setYOffset] = useState(0);

  // IntersectionObserver for enter animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (!parallax || !isVisible) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        const offset = (clampedProgress - 0.5) * 2 * parallaxIntensity;
        setYOffset(offset);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [parallax, parallaxIntensity, isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        'absolute pointer-events-none select-none z-0',
        className
      )}
      style={{
        opacity: isVisible ? opacity : 0,
        transform: `translateY(${yOffset}px) scale(${isVisible ? 1 : 0.95})`,
        transition: `opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
      }}
      aria-hidden="true"
    >
      <Image 
        src="/images/decorations/sardegna.svg" 
        alt=""
        fill
        sizes="160px"
        className="object-contain"
        priority={false}
      />
    </div>
  );
}

export default SardegnaDecoration;
