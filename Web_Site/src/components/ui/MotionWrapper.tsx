"use client";

import React from "react";
import { Reveal } from "@/components/ui/Reveal";

type AnimationType = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scale" | "none";

interface MotionWrapperProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const directionMap: Record<AnimationType, "up" | "left" | "right" | "scale"> = {
  fadeUp: "up",
  fadeIn: "up",
  fadeLeft: "left",
  fadeRight: "right",
  scale: "scale",
  none: "up",
};

export function MotionWrapper({
  children,
  animation = "fadeUp",
  delay = 0,
  className,
}: MotionWrapperProps) {
  if (animation === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <Reveal direction={directionMap[animation]} delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function MotionStagger({
  children,
  staggerDelay = 0.1,
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function MotionStaggerItem({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal direction="up" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}
