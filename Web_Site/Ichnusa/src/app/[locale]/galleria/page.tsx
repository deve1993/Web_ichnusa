"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { X } from "lucide-react";

const categories = [
  { id: "all", label: "Tutto" },
  { id: "interni", label: "Interni" },
  { id: "piatti", label: "Piatti" },
  { id: "eventi", label: "Eventi" },
  { id: "team", label: "Team" },
];

const galleryImages = [
  { id: 1, src: "/images/restaurant/interior.jpg", category: "interni", title: "Sala Principale", aspect: "landscape" },
  { id: 2, src: "/images/food/special-dish.jpg", category: "piatti", title: "Porceddu Arrosto", aspect: "square" },
  { id: 3, src: "/images/events/event-1.jpg", category: "eventi", title: "Serata di Gala", aspect: "portrait" },
  { id: 4, src: "/images/chefs/chef-1.jpg", category: "team", title: "Chef Marco", aspect: "portrait" },
  { id: 5, src: "/images/food/lasagne.jpg", category: "piatti", title: "Malloreddus", aspect: "landscape" },
  { id: 6, src: "/images/food/fish.jpg", category: "piatti", title: "Pesce Fresco", aspect: "square" },
  { id: 7, src: "/images/events/event-2.jpg", category: "eventi", title: "Degustazione Vini", aspect: "landscape" },
  { id: 8, src: "/images/chefs/chef-2.jpg", category: "team", title: "Sous Chef Giuseppe", aspect: "portrait" },
  { id: 9, src: "/images/food/wagyu.jpg", category: "piatti", title: "Carne Sarda", aspect: "square" },
  { id: 10, src: "/images/menu/drinks.jpg", category: "interni", title: "Cantina Vini", aspect: "landscape" },
  { id: 11, src: "/images/food/greek-salad.jpg", category: "piatti", title: "Antipasto Misto", aspect: "square" },
  { id: 12, src: "/images/events/event-3.jpg", category: "eventi", title: "Festa Privata", aspect: "portrait" },
  { id: 13, src: "/images/chefs/chef-3.jpg", category: "team", title: "Pastry Chef Anna", aspect: "portrait" },
  { id: 14, src: "/images/food/olivas.jpg", category: "piatti", title: "Olive e Formaggi", aspect: "square" },
  { id: 15, src: "/images/food/pumpkin.jpg", category: "piatti", title: "Fregola", aspect: "landscape" },
  { id: 16, src: "/images/backgrounds/reservation-bg.jpg", category: "interni", title: "Atmosfera Serale", aspect: "landscape" },
];

export default function GalleriaPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Galleria"
          subtitle="Scopri l'atmosfera e i sapori di Ichnusa attraverso le nostre immagini"
          backgroundImage="/images/events/event-1.jpg"
          breadcrumbs={[{ label: "Galleria", href: "/galleria" }]}
        />

        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-background)]"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            <motion.div 
              layout 
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="break-inside-avoid group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className={`relative overflow-hidden ${
                      image.aspect === "portrait" ? "aspect-[3/4]" :
                      image.aspect === "landscape" ? "aspect-[4/3]" :
                      "aspect-square"
                    }`}>
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
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
                          <span className="text-white text-sm font-medium">{image.title}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-surface)]">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-[var(--font-display)] text-3xl text-white mb-4">
                Seguici su Instagram
              </h3>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-xl mx-auto">
                Resta aggiornato sulle nostre novità, eventi speciali e piatti del giorno
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
            </motion.div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-[var(--color-primary)] transition-colors z-10"
              aria-label="Chiudi"
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="font-[var(--font-display)] text-2xl text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-[var(--color-primary)] text-sm uppercase tracking-wider">
                  {categories.find(c => c.id === selectedImage.category)?.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </>
  );
}
