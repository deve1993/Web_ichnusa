"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-2xl tracking-[0.2em]",
    md: "text-3xl lg:text-4xl tracking-[0.3em]",
    lg: "text-4xl lg:text-5xl tracking-[0.3em]",
  };

  return (
    <Link href="/" className={className}>
      <div className={`font-[var(--font-display)] text-white ${sizes[size]}`}>
        <span className="text-[var(--color-primary)]">D</span>ELICI
      </div>
    </Link>
  );
}
