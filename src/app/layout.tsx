import type { Metadata, Viewport } from "next";
import { sourceSans3, cormorantGaramond } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ichnusa Botega & Bistro",
  description: "Autentico ristorante sardo nel cuore di Praga",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${sourceSans3.variable} ${cormorantGaramond.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
