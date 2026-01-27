"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LineReveal } from "@/components/ui/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RESERVATION_URL = "https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const prefersReducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const timer = setTimeout(() => setShowVideo(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : null;

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-poster.jpg"
          alt="Ichnusa Restaurant Interior"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${videoLoaded && showVideo ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/video/tour-restaurant.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          {...(animationProps || {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 }
          })}
          className="subtitle-decorator justify-center mb-6"
        >
          {t("subtitle")}
        </motion.div>

        <h1 className="font-[var(--font-display)] text-white mb-6">
          <LineReveal delay={prefersReducedMotion ? 0 : 0.4}>
            {t("title1")}
          </LineReveal>
          <LineReveal delay={prefersReducedMotion ? 0 : 0.5}>
            <span className="text-[var(--color-primary)]">{t("title2")}</span>
          </LineReveal>
        </h1>

        <motion.p
          {...(animationProps || {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.6 }
          })}
          className="text-xl text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto"
        >
          {t("description")}
        </motion.p>

        <motion.div
          {...(animationProps || {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.8 }
          })}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton href={RESERVATION_URL} variant="doubleText" target="_blank">
            {tCommon("bookNow")}
          </AnimatedButton>
          <AnimatedButton href="#menu" variant="outline">
            {tCommon("viewMenu")}
          </AnimatedButton>
        </motion.div>
      </div>

      <motion.div
        {...(animationProps || {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1, delay: 1.5 }
        })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
          <span className="text-sm tracking-widest uppercase">{t("scroll")}</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[var(--color-primary)] rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-[var(--color-primary)] rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
