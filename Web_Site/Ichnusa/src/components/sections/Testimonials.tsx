"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      quoteKey: "review1.quote" as const,
      authorKey: "review1.author" as const,
      roleKey: "review1.role" as const,
      avatar: "/images/testimonials/avatar-1.jpg",
    },
    {
      quoteKey: "review2.quote" as const,
      authorKey: "review2.author" as const,
      roleKey: "review2.role" as const,
      avatar: "/images/testimonials/avatar-2.jpg",
    },
    {
      quoteKey: "review3.quote" as const,
      authorKey: "review3.author" as const,
      roleKey: "review3.role" as const,
      avatar: "/images/testimonials/avatar-3.jpg",
    },
  ];

  return (
    <section className="section-padding bg-[var(--color-background-alt)] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/backgrounds/pattern.svg')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Quote
              size={60}
              className="mx-auto text-[var(--color-primary)] opacity-50"
            />
          </motion.div>

          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="px-4"
                >
                  <blockquote className="font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-10">
                    &ldquo;{t(testimonial.quoteKey)}&rdquo;
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-primary)] mb-4">
                      <Image
                        src={testimonial.avatar}
                        alt={t(testimonial.authorKey)}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="w-16 h-0.5 bg-[var(--color-primary)] mb-4" />
                    <cite className="not-italic">
                      <span className="block font-[var(--font-display)] text-xl text-[var(--color-primary)]">
                        {t(testimonial.authorKey)}
                      </span>
                      <span className="text-[var(--color-text-muted)] text-sm">
                        {t(testimonial.roleKey)}
                      </span>
                    </cite>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
