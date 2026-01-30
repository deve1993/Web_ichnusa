"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage: string;
  className?: string;
  overlayOpacity?: number;
  speed?: number;
  minHeight?: string;
}

export function ParallaxSection({
  children,
  backgroundImage,
  className,
  overlayOpacity = 0.7,
  speed = 0.3,
  minHeight = "500px",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = 1 - rect.bottom / (viewH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        setYOffset(clamped * speed * 100);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          transform: `translateY(${yOffset}%)`,
          willChange: "transform",
        }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = 1 - rect.bottom / (viewH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        // Map 0→1 to -10%→+10%
        setYOffset(-10 + clamped * 20);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        className="w-full h-full"
        style={{
          transform: `translateY(${yOffset}%) scale(1.1)`,
          willChange: "transform",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}

interface SplitParallaxSectionProps {
  children: ReactNode;
  backgroundImage: string;
  imagePosition?: "left" | "right";
  className?: string;
}

export function SplitParallaxSection({
  children,
  backgroundImage,
  imagePosition = "left",
  className,
}: SplitParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [imageYOffset, setImageYOffset] = useState(0);
  const [contentYOffset, setContentYOffset] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = 1 - rect.bottom / (viewH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        // imageY: -5% → +5%
        setImageYOffset(-5 + clamped * 10);
        // contentY: +5% → -5% (opposite)
        setContentYOffset(5 - clamped * 10);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="container-custom">
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 items-center",
            imagePosition === "right" && "lg:flex-row-reverse"
          )}
        >
          <div
            className="relative overflow-hidden h-[500px]"
            style={{
              transform: `translateY(${imageYOffset}%)`,
              willChange: "transform",
            }}
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div
            style={{
              transform: `translateY(${contentYOffset}%)`,
              willChange: "transform",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollRevealSection({
  children,
  className,
  delay = 0,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <section
      ref={ref}
      className={cn(
        "transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </section>
  );
}

interface VideoBackgroundSectionProps {
  children: ReactNode;
  videoSrc: string;
  posterImage?: string;
  className?: string;
  overlayOpacity?: number;
}

export function VideoBackgroundSection({
  children,
  videoSrc,
  posterImage,
  className,
  overlayOpacity = 0.6,
}: VideoBackgroundSectionProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={posterImage}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface FixedBackgroundSectionProps {
  children: ReactNode;
  backgroundImage: string;
  className?: string;
  overlayOpacity?: number;
}

export function FixedBackgroundSection({
  children,
  backgroundImage,
  className,
  overlayOpacity = 0.7,
}: FixedBackgroundSectionProps) {
  // background-attachment:fixed requires CSS background — use Next.js image
  // optimization API URL for AVIF/WebP while keeping the fixed effect
  const optimizedUrl = `/_next/image?url=${encodeURIComponent(backgroundImage)}&w=1920&q=75`;

  return (
    <section
      className={cn("relative", className)}
      style={{
        backgroundImage: `url(${optimizedUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
