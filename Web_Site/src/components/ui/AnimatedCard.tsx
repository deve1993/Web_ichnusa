"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTiltEffect, useSpotlightEffect } from "@/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tilt" | "spotlight" | "border";
  delay?: number;
}

export function AnimatedCard({
  children,
  className,
  variant = "default",
  delay = 0,
}: AnimatedCardProps) {
  const [tiltRef, tilt, tiltHandlers] = useTiltEffect<HTMLDivElement>(8, 1.02);
  const [spotlightRef, spotlight, spotlightHandlers] = useSpotlightEffect<HTMLDivElement>();

  if (variant === "tilt") {
    return (
      <motion.div
        ref={tiltRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={cn("relative", className)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition: "transform 0.15s ease-out",
        }}
        onMouseMove={tiltHandlers.onMouseMove}
        onMouseLeave={tiltHandlers.onMouseLeave}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "spotlight") {
    return (
      <motion.div
        ref={spotlightRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={cn("relative overflow-hidden", className)}
        onMouseMove={spotlightHandlers.onMouseMove}
        onMouseEnter={spotlightHandlers.onMouseEnter}
        onMouseLeave={spotlightHandlers.onMouseLeave}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${spotlight.x}px ${spotlight.y}px, rgba(228, 197, 144, 0.15), transparent 80%)`,
            opacity: spotlight.opacity,
          }}
        />
        {children}
      </motion.div>
    );
  }

  if (variant === "border") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={cn("card-border-hover", className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SpecialtyCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  delay?: number;
}

export function SpecialtyCard({
  image,
  title,
  description,
  price,
  delay = 0,
}: SpecialtyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="specialty-card group"
    >
      <div className="card-image-wrapper mb-6 relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="card-image object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="card-overlay" />
        <div className="card-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>
      <div className="card-content text-center">
        <h4 className="card-title font-[var(--font-display)] text-xl text-white mb-2">
          {title}
        </h4>
        <p className="text-[var(--color-text-muted)] text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <span className="font-[var(--font-display)] text-xl text-[var(--color-primary)]">
          {price}
        </span>
      </div>
    </motion.div>
  );
}

interface MenuItemCardProps {
  title: string;
  description: string;
  price: string;
  badge?: string;
  delay?: number;
  /** Index used to vary the watermark placement per card */
  index?: number;
}

const watermarkVariants = [
  { left: "-12px", bottom: "-8px", rotate: "12deg", scale: 1 },
  { left: "-8px", bottom: "-14px", rotate: "-8deg", scale: 0.9 },
  { left: "-16px", bottom: "-6px", rotate: "18deg", scale: 1.05 },
  { left: "-6px", bottom: "-16px", rotate: "-14deg", scale: 0.95 },
  { left: "-14px", bottom: "-10px", rotate: "6deg", scale: 1.1 },
  { left: "-10px", bottom: "-12px", rotate: "-18deg", scale: 0.85 },
];

export function MenuItemCard({
  title,
  description,
  price,
  badge,
  delay = 0,
  index = 0,
}: MenuItemCardProps) {
  const variant = watermarkVariants[index % watermarkVariants.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="menu-item-hover group relative overflow-hidden cursor-pointer py-5 px-4 border-b border-[var(--color-border)]/30"
    >
      <div
        className="absolute pointer-events-none select-none w-20 h-20 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700"
        style={{
          left: variant.left,
          bottom: variant.bottom,
          transform: `rotate(${variant.rotate}) scale(${variant.scale})`,
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/decorations/sardegna.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h4 className="menu-title font-[var(--font-display)] text-xl text-white group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {title}
            {badge && (
              <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-[var(--color-primary)] text-[var(--color-background)] uppercase">
                {badge}
              </span>
            )}
          </h4>
          <span className="font-[var(--font-display)] text-xl text-[var(--color-primary)] whitespace-nowrap">
            {price}
          </span>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  delay?: number;
}

export function TestimonialCard({
  quote,
  author,
  role,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="testimonial-card"
    >
      <span className="quote-icon">&ldquo;</span>
      <p className="text-white text-lg leading-relaxed mb-6">{quote}</p>
      <div>
        <div className="font-[var(--font-display)] text-[var(--color-primary)] text-lg">
          {author}
        </div>
        {role && (
          <div className="text-[var(--color-text-muted)] text-sm">{role}</div>
        )}
      </div>
    </motion.div>
  );
}

interface CounterCardProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  duration?: number;
}

export function CounterCard({
  value,
  suffix = "",
  label,
  delay = 0,
  duration = 2000,
}: CounterCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              
              setCount(Math.floor(eased * value));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(value);
              }
            };
            
            setTimeout(() => {
              requestAnimationFrame(animate);
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration, delay, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="counter-box text-center"
    >
      <div className="counter-value mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[var(--color-text-muted)] uppercase tracking-widest text-sm">
        {label.split(" ").map((word, i) => (
          <span key={i} className="block">
            {word}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
