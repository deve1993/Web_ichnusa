"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

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
    if (!inView) return;

    const duration = 2000;
    let raf: number;
    let t0: number | null = null;

    const step = (now: number) => {
      if (t0 === null) t0 = now;
      const progress = Math.min((now - t0) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
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
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="relative py-32">
        <Image
          src="/images/backgrounds/video-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Video */}
            <Reveal
              direction="left"
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
            </Reveal>

            {/* Right - Stats */}
            <Reveal direction="right">
              <div
                ref={ref}
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
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Video Modal - Pattern D: always in DOM, toggle visibility */}
      <div
        className={`fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
          isVideoOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsVideoOpen(false)}
      >
        <button
          onClick={() => setIsVideoOpen(false)}
          className={`absolute top-6 right-6 text-white hover:text-[var(--color-primary)] transition-all duration-300 z-10 ${
            isVideoOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <X size={40} />
        </button>

        <div
          className={`w-full max-w-5xl aspect-video transition-all duration-300 ${
            isVideoOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-12"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {isVideoOpen && (
            <iframe
              src="https://www.youtube.com/embed/ZETY_l3GVQg?autoplay=1"
              title="Restaurant Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  );
}
