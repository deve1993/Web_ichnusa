"use client";

import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const MobileCTA = dynamic(() => import("@/components/MobileCTA"), { ssr: false });
const WhatsAppWidget = dynamic(() => import("@/components/WhatsAppWidget"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

export default function ClientWidgets({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      {children}
      <ScrollToTop />
      <MobileCTA />
      <WhatsAppWidget />
      <CookieBanner />
    </>
  );
}
