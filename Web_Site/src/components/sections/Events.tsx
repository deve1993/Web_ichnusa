"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const events = [
  {
    title: "Chef's Special Night",
    date: "January 20, 2024",
    description:
      "Experience an exclusive evening with our master chef presenting a unique 7-course tasting menu.",
    image: "/images/events/event-1.jpg",
  },
  {
    title: "Wine Tasting Evening",
    date: "January 25, 2024",
    description:
      "Join us for an exquisite wine tasting session featuring selections from renowned vineyards.",
    image: "/images/events/event-2.jpg",
  },
  {
    title: "Valentine's Dinner",
    date: "February 14, 2024",
    description:
      "Celebrate love with a romantic candlelit dinner featuring a specially curated menu.",
    image: "/images/events/event-3.jpg",
  },
];

export default function Events() {
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="subtitle-decorator mb-4"
            >
              Recent Updates
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white"
            >
              Upcoming Events
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="#" className="btn-primary">
              View Our Blog
            </Link>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-6 h-64">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-[var(--color-background)] px-4 py-2 font-[var(--font-display)]">
                  <Calendar size={16} className="inline mr-2" />
                  {event.date}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-[var(--font-display)] text-2xl text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {event.title}
              </h3>
              <p className="text-[var(--color-text-muted)] mb-4 line-clamp-2">
                {event.description}
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] group-hover:gap-4 transition-all"
              >
                Read More
                <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
