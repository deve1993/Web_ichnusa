"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Quote, Star, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { GoogleReview } from "@/lib/google-places";

interface GoogleReviewsProps {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  googleMapsUrl: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
              : "text-[var(--color-text-muted)]"
          }
        />
      ))}
    </div>
  );
}

export default function GoogleReviews({
  reviews,
  rating,
  totalReviews,
  googleMapsUrl,
}: GoogleReviewsProps) {
  const t = useTranslations("googleReviews");

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-[var(--color-background-alt)] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/backgrounds/pattern.svg')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/images/icons/google-logo.svg"
              alt="Google"
              width={24}
              height={24}
              className="opacity-80"
            />
            <span className="text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
              {t("title")}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-[var(--font-display)] text-4xl text-white">
              {rating.toFixed(1)}
            </span>
            <div className="flex flex-col items-start">
              <StarRating rating={Math.round(rating)} />
              <span className="text-[var(--color-text-muted)] text-sm">
                {totalReviews} {t("reviews")}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
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
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="px-4"
                >
                  <div className="flex justify-center mb-6">
                    <StarRating rating={review.rating} />
                  </div>

                  <blockquote className="font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-10">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-primary)] mb-4 bg-[var(--color-surface)]">
                      {review.profile_photo_url ? (
                        <Image
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl text-[var(--color-primary)]">
                          {review.author_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="w-16 h-0.5 bg-[var(--color-primary)] mb-4" />
                    <cite className="not-italic">
                      <span className="block font-[var(--font-display)] text-xl text-[var(--color-primary)]">
                        {review.author_name}
                      </span>
                      <span className="text-[var(--color-text-muted)] text-sm">
                        {review.relative_time_description}
                      </span>
                    </cite>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-white transition-colors"
            >
              {t("viewAll")}
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
