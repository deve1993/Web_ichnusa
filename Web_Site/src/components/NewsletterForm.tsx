"use client";

import { useState } from "react";
import { Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("newsletter");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    const result = await subscribeNewsletter(email);

    if (result.success) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setErrorMsg(result.error || t("errorGeneric"));
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="email"
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-transparent border border-[var(--color-border)] border-r-0 px-6 py-4 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          aria-label={t("subscribe")}
          className="bg-[var(--color-primary)] px-8 py-4 text-[var(--color-background)] hover:bg-[var(--color-primary-dark)] transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : status === "success" ? (
            <Check size={18} />
          ) : (
            <>
              <span className="hidden sm:inline uppercase tracking-wider text-sm font-medium">
                {t("subscribe")}
              </span>
              <Send size={18} />
            </>
          )}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-2 text-sm text-green-400 flex items-center gap-1.5">
          <Check size={14} />
          {t("success")}
        </p>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
          <AlertCircle size={14} />
          {errorMsg}
        </p>
      )}
    </div>
  );
}
