"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = ["I", "C", "H", "N", "U", "S", "A"];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[var(--color-background)] flex flex-col items-center justify-center"
        >
          <div className="flex items-center gap-1 md:gap-2">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`text-4xl md:text-7xl font-[var(--font-display)] tracking-[0.2em] md:tracking-[0.3em] ${
                  index === 0 ? "text-[var(--color-primary)]" : "text-white"
                }`}
                style={{
                  animation: `textBlink 2s infinite ${index * 0.1}s`,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-[var(--color-text-muted)] text-xs md:text-sm tracking-[0.3em] mt-2"
          >
            BOTEGA & BISTRO
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-[var(--color-primary)] origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
