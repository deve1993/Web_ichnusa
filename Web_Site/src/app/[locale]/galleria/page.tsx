"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { SardegnaDecoration } from "@/components/ui/SardegnaDecoration";
import { Reveal } from "@/components/ui/Reveal";
import { X } from "lucide-react";

const categoryIds = ["all", "interni", "piatti", "vini"] as const;

const galleryImages = [
  { id: 1, src: "/images/gallery/sala-1.webp", category: "interni", titleKey: "Interno 1", aspect: "landscape" },
  { id: 2, src: "/images/gallery/10.webp", category: "interni", titleKey: "Interno 2", aspect: "landscape" },
  { id: 3, src: "/images/gallery/12.webp", category: "interni", titleKey: "Interno 3", aspect: "landscape" },
  { id: 4, src: "/images/gallery/25.webp", category: "interni", titleKey: "Interno 4", aspect: "portrait" },
  { id: 5, src: "/images/gallery/28.webp", category: "interni", titleKey: "Interno 5", aspect: "landscape" },
  { id: 6, src: "/images/gallery/07.webp", category: "vini", titleKey: "Vino 1", aspect: "portrait" },
  { id: 7, src: "/images/gallery/08.webp", category: "vini", titleKey: "Vino 2", aspect: "square" },
  { id: 8, src: "/images/gallery/11.webp", category: "vini", titleKey: "Vino 3", aspect: "portrait" },
  { id: 9, src: "/images/gallery/15.webp", category: "vini", titleKey: "Vino 4", aspect: "square" },
  { id: 10, src: "/images/gallery/17.webp", category: "vini", titleKey: "Vino 5", aspect: "portrait" },
  { id: 11, src: "/images/gallery/01.webp", category: "piatti", titleKey: "Piatto 1", aspect: "square" },
  { id: 12, src: "/images/gallery/02.webp", category: "piatti", titleKey: "Piatto 2", aspect: "landscape" },
  { id: 13, src: "/images/gallery/03.webp", category: "piatti", titleKey: "Piatto 3", aspect: "square" },
  { id: 14, src: "/images/gallery/04.webp", category: "piatti", titleKey: "Piatto 4", aspect: "portrait" },
  { id: 15, src: "/images/gallery/05.webp", category: "piatti", titleKey: "Piatto 5", aspect: "square" },
  { id: 16, src: "/images/gallery/06.webp", category: "piatti", titleKey: "Piatto 6", aspect: "landscape" },
  { id: 17, src: "/images/gallery/09.webp", category: "interni", titleKey: "Interno 6", aspect: "square" },
  { id: 18, src: "/images/gallery/13.webp", category: "piatti", titleKey: "Piatto 8", aspect: "portrait" },
  { id: 19, src: "/images/gallery/14.webp", category: "piatti", titleKey: "Piatto 9", aspect: "square" },
  { id: 20, src: "/images/gallery/16.webp", category: "piatti", titleKey: "Piatto 10", aspect: "landscape" },
  { id: 21, src: "/images/gallery/18.webp", category: "piatti", titleKey: "Piatto 11", aspect: "square" },
  { id: 22, src: "/images/gallery/19.webp", category: "piatti", titleKey: "Piatto 12", aspect: "portrait" },
  { id: 23, src: "/images/gallery/20.webp", category: "piatti", titleKey: "Piatto 13", aspect: "square" },
  { id: 24, src: "/images/gallery/21.webp", category: "piatti", titleKey: "Piatto 14", aspect: "landscape" },
  { id: 25, src: "/images/gallery/22.webp", category: "piatti", titleKey: "Piatto 15", aspect: "square" },
  { id: 26, src: "/images/gallery/23.webp", category: "piatti", titleKey: "Piatto 16", aspect: "portrait" },
  { id: 27, src: "/images/gallery/24.webp", category: "piatti", titleKey: "Piatto 17", aspect: "square" },
  { id: 28, src: "/images/gallery/26.webp", category: "piatti", titleKey: "Piatto 18", aspect: "landscape" },
  { id: 29, src: "/images/gallery/27.webp", category: "piatti", titleKey: "Piatto 19", aspect: "square" },
  { id: 30, src: "/images/gallery/29.webp", category: "piatti", titleKey: "Piatto 20", aspect: "portrait" },
  { id: 31, src: "/images/gallery/30.webp", category: "piatti", titleKey: "Piatto 21", aspect: "square" },
];

export default function GalleriaPage() {
  const t = useTranslations("gallery");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const [activeCategory, setActiveCategory] = useState<typeof categoryIds[number]>("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const getCategoryLabel = (id: typeof categoryIds[number]) => {
    return t(`categories.${id}`);
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          backgroundImage="/images/gallery/28.webp"
          breadcrumbs={[{ label: tNav("gallery"), href: "/galleria" }]}
        />

        <section className="section-padding bg-[var(--color-background)] relative overflow-hidden">
          <SardegnaDecoration 
            className="top-1/3 -right-32 w-[500px] h-[700px] rotate-12"
            opacity={0.05}
          />
          <div className="container-custom relative z-10">
            <div
              className="hero-fade-up flex flex-wrap justify-center gap-3 mb-12"
            >
              {categoryIds.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-background)]"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <div
                  key={`${activeCategory}-${image.id}`}
                  className="break-inside-avoid group cursor-pointer"
                  style={{ opacity: 0, animation: `galleryFadeIn 0.4s ease-out ${index * 0.05}s forwards` }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={`relative overflow-hidden ${
                    image.aspect === "portrait" ? "aspect-[3/4]" :
                    image.aspect === "landscape" ? "aspect-[4/3]" :
                    "aspect-square"
                  }`}>
                    <Image
                      src={image.src}
                      alt={image.titleKey}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-center">
                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-3 mx-auto">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                        <span className="text-white text-sm font-medium">{image.titleKey}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-surface)]">
          <div className="container-custom text-center">
            <Reveal direction="up">
              <h3 className="font-[var(--font-display)] text-3xl text-white mb-4">
                {t("followInstagram")}
              </h3>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-xl mx-auto">
                {t("followInstagramDesc")}
              </p>
              <a
                href="https://www.instagram.com/ichnusa_official_prague/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @ichnusa_official_prague
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Lightbox - always in DOM, toggle visibility */}
      <div
        className={`fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300 ${
          selectedImage ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSelectedImage(null)}
      >
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-6 right-6 text-white hover:text-[var(--color-primary)] transition-colors z-10"
          aria-label={tCommon("close")}
        >
          <X size={32} />
        </button>
        
        <div
          className={`relative max-w-5xl max-h-[85vh] w-full transition-all duration-300 ${
            selectedImage ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedImage && (
            <>
              <div className="relative aspect-[4/3]">
                <Image
                   src={selectedImage.src}
                   alt={selectedImage.titleKey}
                   fill
                   sizes="100vw"
                   className="object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="font-[var(--font-display)] text-2xl text-white">
                  {selectedImage.titleKey}
                </h3>
                <p className="text-[var(--color-primary)] text-sm uppercase tracking-wider">
                  {getCategoryLabel(selectedImage.category as typeof categoryIds[number])}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      ` }} />
      
      <Footer />
    </>
  );
}
