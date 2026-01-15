"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "420605375012";
const DEFAULT_MESSAGE = "Ciao! Vorrei prenotare un tavolo al ristorante Ichnusa.";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: "bottom-right" | "bottom-left";
}

export default function WhatsAppWidget({
  phoneNumber = WHATSAPP_NUMBER,
  defaultMessage = DEFAULT_MESSAGE,
  position = "bottom-right",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const positionClasses = {
    "bottom-right": "right-4 sm:right-6",
    "bottom-left": "left-4 sm:left-6",
  };

  if (!isVisible) return null;

  return (
    <div className={cn("fixed bottom-20 sm:bottom-6 z-50", positionClasses[position])}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-72 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden mb-2"
          >
            <div className="bg-[#25D366] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Ichnusa</h3>
                    <p className="text-white/80 text-xs">Di solito risponde subito</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Chiudi"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-[var(--color-surface)] rounded-lg p-3 mb-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Ciao! 👋 Come possiamo aiutarti? Scrivici per prenotare un tavolo o per qualsiasi informazione.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Avvia chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors",
          isOpen 
            ? "bg-[var(--color-background)] border border-[var(--color-border)]" 
            : "bg-[#25D366] hover:bg-[#20BD5A]"
        )}
        aria-label={isOpen ? "Chiudi WhatsApp" : "Apri WhatsApp"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-[var(--color-text)]" />
            </motion.div>
          ) : (
            <motion.svg
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-7 h-7"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 31c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C7.716 1 1 7.716 1 16c0 2.89.816 5.588 2.23 7.88L1 31l7.12-2.23A14.933 14.933 0 0016 31zm0-2.5a12.5 12.5 0 100-25 12.5 12.5 0 000 25z"
                fill="white"
              />
              <path
                d="M22.034 18.748c-.332-.166-1.958-.966-2.262-1.076-.303-.11-.524-.166-.744.166-.22.332-.856 1.076-1.05 1.297-.193.221-.386.249-.718.083-.332-.166-1.4-.516-2.666-1.645-.985-.879-1.65-1.963-1.844-2.295-.193-.332-.02-.512.146-.677.149-.149.332-.387.498-.58.166-.194.221-.332.332-.554.11-.221.055-.415-.028-.58-.083-.166-.744-1.795-1.02-2.458-.27-.645-.543-.558-.745-.568-.193-.01-.414-.012-.636-.012-.221 0-.58.083-.884.415-.304.332-1.16 1.133-1.16 2.763 0 1.63 1.188 3.204 1.354 3.425.166.22 2.338 3.57 5.663 5.006.791.342 1.409.546 1.89.699.794.252 1.517.217 2.088.132.637-.095 1.958-.8 2.234-1.574.276-.773.276-1.436.193-1.574-.083-.138-.304-.22-.636-.387z"
                fill="white"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
        >
          <span className="bg-[var(--color-background)] text-[var(--color-text)] text-xs py-1.5 px-3 rounded-full border border-[var(--color-border)] shadow-lg">
            Scrivici su WhatsApp!
          </span>
        </motion.div>
      )}
    </div>
  );
}
