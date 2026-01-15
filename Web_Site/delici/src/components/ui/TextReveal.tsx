"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { staggerDelay: number }) => ({
    transition: {
      staggerChildren: custom.staggerDelay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  once = true,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={{ staggerDelay }}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden mr-[0.25em]">
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

const charVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function CharReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
  once = true,
}: CharRevealProps) {
  const chars = children.split("");

  return (
    <motion.span
      className={`inline-flex ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={{ staggerDelay }}
      transition={{ delayChildren: delay }}
    >
      {chars.map((char, index) => (
        <span key={index} className="overflow-hidden">
          <motion.span className="inline-block" variants={charVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function LineReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: LineRevealProps) {
  return (
    <span className={`overflow-hidden block ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  once = true,
}: SplitTextProps) {
  const lines = children.split("\n");

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <LineReveal key={index} delay={delay + index * 0.1} once={once}>
          {line}
        </LineReveal>
      ))}
    </span>
  );
}
