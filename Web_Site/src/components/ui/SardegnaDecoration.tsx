'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    parallax && !shouldReduceMotion ? [-parallaxIntensity, parallaxIntensity] : [0, 0]
  );

  return (
    <motion.div 
      ref={ref}
      className={cn(
        'absolute pointer-events-none select-none z-0',
        className
      )}
      style={{ y, opacity }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      aria-hidden="true"
    >
      <Image 
        src="/images/decorations/sardegna.svg" 
        alt=""
        fill
        className="object-contain"
        priority={false}
      />
    </motion.div>
  );
}

export default SardegnaDecoration;
