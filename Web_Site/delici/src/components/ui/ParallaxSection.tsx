"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y,
        }}
      />
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
  speed = 0.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale: 1.1 }}
      />
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="container-custom">
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 items-center",
            imagePosition === "right" && "lg:flex-row-reverse"
          )}
        >
          <motion.div
            className="relative overflow-hidden h-[500px]"
            style={{ y: imageY }}
          >
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div style={{ y: contentY }}>{children}</motion.div>
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
  return (
    <section
      className={cn("relative", className)}
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
