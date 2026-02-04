"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "doubleText" | "slideText" | "brackets" | "circleFill" | "ghost" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: "_blank" | "_self";
}

export function AnimatedButton({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  disabled = false,
  type = "button",
  target,
}: AnimatedButtonProps) {
    const baseStyles = cn(
      "relative inline-flex items-center justify-center",
      "font-[var(--font-display)] text-base tracking-wider uppercase",
      "transition-all duration-300 cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    const variants = {
      primary: "btn-primary",
      doubleText: "btn-double-text",
      slideText: "btn-slide-text",
      brackets: "btn-brackets",
      circleFill: "btn-circle-fill",
      ghost: cn(
        "px-6 py-3 text-[var(--color-primary)]",
        "hover:text-white"
      ),
      outline: cn(
        "px-8 py-4 border-2 border-white/30",
        "text-white bg-transparent",
        "hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
      ),
    };

    if (variant === "doubleText") {
      const content = (
        <span className="btn-text-wrapper">
          <span className="btn-text-inner">
            <span>{children}</span>
            <span>{children}</span>
          </span>
        </span>
      );

      if (href) {
        if (target === "_blank") {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseStyles, variants[variant])}>
              {content}
            </a>
          );
        }
        return (
          <Link href={href} className={cn(baseStyles, variants[variant])}>
            {content}
          </Link>
        );
      }

      return (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={cn(baseStyles, variants[variant])}
        >
          {content}
        </button>
      );
    }

    if (variant === "slideText") {
      const content = (
        <span className="btn-text relative overflow-hidden h-6">
          <span>{children}</span>
          <span>{children}</span>
        </span>
      );

      if (href) {
        return (
          <Link href={href} className={cn(baseStyles, variants[variant])}>
            {content}
          </Link>
        );
      }

      return (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={cn(baseStyles, variants[variant])}
        >
          {content}
        </button>
      );
    }

    if (href) {
      if (target === "_blank") {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseStyles, variants[variant])}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={cn(baseStyles, variants[variant])}>
          {children}
        </Link>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(baseStyles, variants[variant])}
      >
        {children}
      </button>
    );
  }

interface AnimatedLinkProps {
  children: ReactNode;
  href: string;
  variant?: "underline" | "doubleLine" | "fill";
  className?: string;
}

export function AnimatedLink({
  children,
  href,
  variant = "underline",
  className,
}: AnimatedLinkProps) {
  const variants = {
    underline: "text-hover-underline",
    doubleLine: "text-hover-double",
    fill: "link-hover-fill px-4 py-2",
  };

  return (
    <Link
      href={href}
      className={cn(
        "text-[var(--color-primary)] transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel: string;
}

export function IconButton({
  icon,
  onClick,
  href,
  className,
  ariaLabel,
}: IconButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center",
    "w-12 h-12 border border-[var(--color-primary)]",
    "text-[var(--color-primary)]",
    "transition-all duration-300",
    "hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles} aria-label={ariaLabel}>
        {icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseStyles}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

interface PlayButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PlayButton({ onClick, size = "md", className }: PlayButtonProps) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center group",
        sizes[size],
        className
      )}
    >
      <div className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-full animate-ping opacity-30" />
      <div className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-full" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={cn(
          "text-[var(--color-primary)] ml-1 group-hover:scale-110 transition-transform",
          iconSizes[size]
        )}
      >
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    </button>
  );
}

interface SocialButtonProps {
  icon: ReactNode;
  href: string;
  ariaLabel: string;
  className?: string;
}

export function SocialButton({
  icon,
  href,
  ariaLabel,
  className,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center",
        "w-10 h-10 rounded-full",
        "border border-[var(--color-border)]",
        "text-[var(--color-text-muted)]",
        "transition-all duration-300",
        "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        className
      )}
    >
      {icon}
    </a>
  );
}
