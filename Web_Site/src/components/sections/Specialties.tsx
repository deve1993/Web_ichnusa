"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { SpecialtyCard } from "@/components/ui/AnimatedCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const specialties = [
  {
    name: "Greek Salad",
    description: "Avocados with crab meat, red onion, crab salad red bell pepper...",
    price: "$39.00",
    image: "/images/food/greek-salad.jpg",
  },
  {
    name: "Tokusen Wagyu",
    description: "Tomatoes, green bell pepper, sliced cucumber onion, olives...",
    price: "$45.00",
    image: "/images/food/wagyu.jpg",
  },
  {
    name: "Butternut Pumpkin",
    description: "Avocados with crab meat, red onion, crab salad stuffed bell pepper...",
    price: "$15.00",
    image: "/images/food/pumpkin.jpg",
  },
  {
    name: "Opu Fish",
    description: "Vegetables, cheeses, ground meats, tomato sauce, seasonings...",
    price: "$12.00",
    image: "/images/food/fish.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Specialties() {
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.div variants={itemVariants} className="subtitle-decorator justify-center mb-4">
              Special Offer
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-white">
              Best Specialties
            </motion.h2>
          </div>

          <motion.div variants={itemVariants} className="relative px-4 lg:px-16">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: ".specialties-prev",
                nextEl: ".specialties-next",
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="specialties-swiper"
            >
              {[...specialties, ...specialties].map((item, index) => (
                <SwiperSlide key={index}>
                  <SpecialtyCard
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="specialties-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-[var(--color-primary)] items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 hidden lg:flex"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="specialties-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-[var(--color-primary)] items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 hidden lg:flex"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <AnimatedButton href="#menu" variant="primary">
              View All Menu
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
