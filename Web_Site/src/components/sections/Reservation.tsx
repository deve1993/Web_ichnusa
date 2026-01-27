"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const RESERVATION_URL = "https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1";
const PHONE_NUMBER = "+420 605 375 012";

export default function Reservation() {
  const t = useTranslations("reservation");
  return (
    <section
      id="reservation"
      className="section-padding relative"
      style={{
        backgroundImage: "url('/images/backgrounds/reservation-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#151617] p-8 lg:p-12 flex flex-col"
          >
            <h2 className="font-[var(--font-display)] text-white text-3xl lg:text-4xl mb-4">
              {t("title")}
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              {t("description", { phone: "" })}
              <a
                href="tel:+420605375012"
                className="text-[var(--color-primary)] hover:underline"
              >
                {PHONE_NUMBER}
              </a>
            </p>

            <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
              <div className="mb-8">
                <div className="relative w-40 h-52 mx-auto mb-6 flex items-center justify-center">
                  <Image
                    src="/images/siloutte-sar.svg"
                    alt=""
                    fill
                    className="object-contain opacity-60"
                  />
                  <Phone className="text-[var(--color-primary)] relative z-10 -mt-2 ml-2" size={36} />
                </div>
                <p className="text-[var(--color-text-muted)] mb-2">
                  {t("bookInClicks")}
                </p>
                <p className="text-white text-lg font-[var(--font-display)]">
                  {t("dishSystem")}
                </p>
              </div>

              <AnimatedButton 
                href={RESERVATION_URL} 
                variant="primary"
                target="_blank"
              >
                {t("button")}
              </AnimatedButton>

              <p className="text-[var(--color-text-muted)] text-sm mt-6">
                {t("instantConfirm")}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
              <p className="text-[var(--color-text-muted)] text-sm text-center">
                {t("groupsNote")}{" "}
                <Link href="/contatti" className="text-[var(--color-primary)] hover:underline">
                  {t("contactUs")}
                </Link>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-[var(--font-display)] text-white text-3xl lg:text-4xl mb-6">
              {t("findUs")}
            </h2>

            <p className="text-[var(--color-text-muted)] mb-8">
              {t("callToBook")}{" "}
              <a
                href="tel:+420605375012"
                className="text-[var(--color-primary)] hover:underline text-2xl font-[var(--font-display)]"
              >
                {PHONE_NUMBER}
              </a>
            </p>

            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 border border-[var(--color-primary)] flex items-center justify-center">
                  <MapPin className="text-[var(--color-primary)]" size={24} />
                </div>
                <div>
                  <h4 className="font-[var(--font-display)] text-white text-lg mb-1">
                    {t("addressLabel")}
                  </h4>
                  <p className="text-[var(--color-text-muted)]">
                    Plaská 623/5
                    <br />
                    150 00 Malá Strana, Praha
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 border border-[var(--color-primary)] flex items-center justify-center">
                  <Clock className="text-[var(--color-primary)]" size={24} />
                </div>
                <div>
                  <h4 className="font-[var(--font-display)] text-white text-lg mb-1">
                    {t("lunch")}
                  </h4>
                  <p className="text-[var(--color-text-muted)]">
                    {t("mondaySunday")}
                    <br />
                    11:30 - 15:00
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 border border-[var(--color-primary)] flex items-center justify-center">
                  <Clock className="text-[var(--color-primary)]" size={24} />
                </div>
                <div>
                  <h4 className="font-[var(--font-display)] text-white text-lg mb-1">
                    {t("dinner")}
                  </h4>
                  <p className="text-[var(--color-text-muted)]">
                    {t("mondaySunday")}
                    <br />
                    18:00 - 23:00
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 border border-[var(--color-primary)] flex items-center justify-center">
                  <Phone className="text-[var(--color-primary)]" size={24} />
                </div>
                <div>
                  <h4 className="font-[var(--font-display)] text-white text-lg mb-1">
                    {t("contacts")}
                  </h4>
                  <p className="text-[var(--color-text-muted)]">
                    <a href="tel:+420605375012" className="hover:text-[var(--color-primary)] transition-colors">
                      {PHONE_NUMBER}
                    </a>
                    <br />
                    <a href="mailto:info@ichnusa.cz" className="hover:text-[var(--color-primary)] transition-colors">
                      info@ichnusa.cz
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
