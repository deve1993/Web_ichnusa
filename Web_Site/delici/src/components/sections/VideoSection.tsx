"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const stats = [
  { value: 350, label: "Daily Order", suffix: "+" },
  { value: 80, label: "Special Dishes", suffix: "+" },
  { value: 25, label: "Expert Chef", suffix: "+" },
  { value: 15, label: "Awards Won", suffix: "+" },
];

function Counter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function VideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section
        className="relative py-32"
        style={{
          backgroundImage: "url('/images/backgrounds/video-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="subtitle-decorator justify-center lg:justify-start mb-4">
                Amazing Experience
              </div>
              <h2 className="text-white mb-8">Watch Our Video</h2>

              {/* Play Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="relative inline-flex items-center justify-center w-24 h-24 mb-8 group"
              >
                <div className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-full animate-ping opacity-30" />
                <div className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-full" />
                <Play
                  size={32}
                  className="text-[var(--color-primary)] ml-1 group-hover:scale-110 transition-transform"
                />
              </button>

              <h3 className="font-[var(--font-display)] text-white text-2xl lg:text-3xl mb-4 max-w-md">
                A modern restaurant with a menu that will make your mouth water.
              </h3>
              <p className="text-[var(--color-primary)]">
                William Joe - Master Chef
              </p>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <div className="font-[var(--font-display)] text-5xl lg:text-6xl text-[var(--color-primary)] mb-2">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  </div>
                  <div className="text-[var(--color-text-muted)] uppercase tracking-widest text-sm">
                    {stat.label.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[var(--color-primary)] transition-colors z-10"
            >
              <X size={40} />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/ZETY_l3GVQg?autoplay=1"
                title="Restaurant Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
