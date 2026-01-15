"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const chefs = [
  {
    name: "Mark Henry",
    role: "Master Chef",
    image: "/images/chefs/chef-1.jpg",
  },
  {
    name: "William Joe",
    role: "Senior Chef",
    image: "/images/chefs/chef-2.jpg",
  },
  {
    name: "Sara Smith",
    role: "Pastry Chef",
    image: "/images/chefs/chef-3.jpg",
  },
];

export default function Team() {
  return (
    <section id="chefs" className="section-padding bg-[var(--color-background-alt)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="subtitle-decorator justify-center mb-4"
          >
            Experienced Team
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white"
          >
            Meet Our Chef
          </motion.h2>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Social Links */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-center gap-4">
                    {[Facebook, Twitter, Instagram].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-10 h-10 border border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-[var(--font-display)] text-2xl text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {chef.name}
                </h3>
                <p className="text-[var(--color-primary)] uppercase tracking-widest text-sm">
                  {chef.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
