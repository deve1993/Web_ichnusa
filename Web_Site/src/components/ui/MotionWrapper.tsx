"use client";

import { motion, Variants, TargetAndTransition } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AnimationType = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scale" | "none";

interface AnimationConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
}

interface MotionWrapperProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const animations: Record<AnimationType, AnimationConfig> = {
  fadeUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  fadeLeft: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  fadeRight: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  none: { initial: { opacity: 1 }, animate: { opacity: 1 } },
};

const noMotion: AnimationConfig = { initial: { opacity: 1 }, animate: { opacity: 1 } };

export function MotionWrapper({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  className,
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const anim = prefersReducedMotion ? noMotion : animations[animation];

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.animate}
      viewport={{ once }}
      transition={{ duration: prefersReducedMotion ? 0 : duration, delay: prefersReducedMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
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
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
