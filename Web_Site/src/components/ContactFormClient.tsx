"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { getReferralDataForSubmission } from "@/hooks";
import { submitContactForm } from "@/app/actions/contact";
import { Link } from "@/i18n/navigation";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ContactFormClient() {
  const t = useTranslations("contact");

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);

    const referralData = getReferralDataForSubmission();
    const fullData = { ...formState, ...referralData };

    try {
      const result = await submitContactForm(fullData);
      
      if (result.success) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
        setPrivacyConsent(false);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || null);
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(null);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.span variants={fadeInUp} className="subtitle-decorator mb-4">
        {t("form.subtitle")}
      </motion.span>
      <motion.h2
        variants={fadeInUp}
        className="font-[var(--font-display)] text-4xl text-white mb-6"
      >
        {t("form.title").split(" ")[0]}{" "}
        <span className="text-[var(--color-primary)]">
          {t("form.title").split(" ").slice(1).join(" ")}
        </span>
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-[var(--color-text-muted)] mb-8">
        {t("form.description")}
      </motion.p>

      <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm text-[var(--color-text-muted)] mb-2">
              {t("form.name")} *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              placeholder={t("form.namePlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-[var(--color-text-muted)] mb-2">
              {t("form.email")} *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              placeholder={t("form.emailPlaceholder")}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm text-[var(--color-text-muted)] mb-2">
              {t("form.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              placeholder={t("form.phonePlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm text-[var(--color-text-muted)] mb-2">
              {t("form.subject")} *
            </label>
            <select
              id="subject"
              required
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
            >
              <option value="">{t("form.subjectPlaceholder")}</option>
              <option value="info">{t("form.subjects.info")}</option>
              <option value="reservation">{t("form.subjects.reservation")}</option>
              <option value="event">{t("form.subjects.event")}</option>
              <option value="products">{t("form.subjects.products")}</option>
              <option value="other">{t("form.subjects.other")}</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-[var(--color-text-muted)] mb-2">
            {t("form.message")} *
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
            placeholder={t("form.messagePlaceholder")}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy-consent"
            required
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
          />
          <label htmlFor="privacy-consent" className="text-sm text-[var(--color-text-muted)]">
            {t("form.privacyConsent")}{" "}
            <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
              {t("form.privacyLink")}
            </Link>{" "}
            *
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t("form.sending")}
              </>
            ) : (
              <>
                <Send size={18} />
                {t("form.submit")}
              </>
            )}
          </button>

          {submitStatus === "success" && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-green-500 text-sm"
            >
              {t("form.success")}
            </motion.span>
          )}

          {submitStatus === "error" && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm"
            >
              {errorMessage || t("form.error")}
            </motion.span>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
}
