"use client";

import { useState, useEffect } from "react";

const letters = ["I", "C", "H", "N", "U", "S", "A"];

export default function Preloader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const DISPLAY_TIME = 400;

    const timer = setTimeout(() => setIsExiting(true), DISPLAY_TIME);
    return () => clearTimeout(timer);
  }, []);

  if (isDone) return null;

  return (
    <>
      <style>{`
        @keyframes preloaderLetterIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes preloaderScale {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
      <div
        className={`fixed inset-0 z-[9999] bg-[var(--color-background)] flex flex-col items-center justify-center transition-opacity duration-500 ${
          isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onTransitionEnd={() => {
          if (isExiting) {
            setIsDone(true);
          }
        }}
      >
        <div className="flex items-center gap-1 md:gap-2">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`text-4xl md:text-7xl font-[var(--font-display)] tracking-[0.2em] md:tracking-[0.3em] ${
                index === 0 ? "text-[var(--color-primary)]" : "text-white"
              }`}
              style={{
                opacity: 0,
                animation: `preloaderLetterIn 0.4s ease-out ${index * 0.1}s forwards, textBlink 2s infinite ${index * 0.1}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div
          className="text-[var(--color-text-muted)] text-xs md:text-sm tracking-[0.3em] mt-2"
          style={{
            opacity: 0,
            animation: "preloaderLetterIn 0.5s ease-out 0.8s forwards",
          }}
        >
          BOTEGA & BISTRO
        </div>

        <div
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-[var(--color-primary)] origin-left"
          style={{
            transform: "scaleX(0)",
            animation: "preloaderScale 2s ease-in-out forwards",
          }}
        />
      </div>
    </>
  );
}
