"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  category: "Sunrise" | "Sunset" | "Adventure" | "Family" | "Nature";
  title: string;
  location: string;
  image: string;
  aspect: string; // Tailwind aspect classes for masonry effect
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = ["All", "Sunrise", "Sunset", "Adventure", "Family", "Nature"];

  const items: GalleryItem[] = [
    {
      id: 1,
      category: "Sunrise",
      title: "Misty Estuary Wake",
      location: "Dharmadam Island Estuary",
      image: "/about_kerala_kayak.png",
      aspect: "aspect-square",
    },
    {
      id: 2,
      category: "Sunset",
      title: "Golden Hour Horizons",
      location: "Arabian Sea Inlet",
      image: "/experience_sunset.png",
      aspect: "aspect-[3/4]",
    },
    {
      id: 3,
      category: "Adventure",
      title: "Navigating River Currents",
      location: "Valapattanam River",
      image: "/about_kerala_kayak.png",
      aspect: "aspect-[4/3]",
    },
    {
      id: 4,
      category: "Family",
      title: "Family Floating Escapes",
      location: "Ezhara Lagoon",
      image: "/experience_sunset.png",
      aspect: "aspect-square",
    },
    {
      id: 5,
      category: "Nature",
      title: "Deep Mangrove Archways",
      location: "Kavvayi Mangroves",
      image: "/about_kerala_kayak.png",
      aspect: "aspect-[3/4]",
    },
    {
      id: 6,
      category: "Sunset",
      title: "Burning Sky Reflections",
      location: "Muzhappilangad Estuary",
      image: "/experience_sunset.png",
      aspect: "aspect-square",
    },
    {
      id: 7,
      category: "Adventure",
      title: "Dawn Expedition Stride",
      location: "Dharmadam Estuary",
      image: "/about_kerala_kayak.png",
      aspect: "aspect-[4/5]",
    },
    {
      id: 8,
      category: "Nature",
      title: "Mirror River Silence",
      location: "Kavvayi Backwaters",
      image: "/experience_sunset.png",
      aspect: "aspect-video",
    },
  ];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === 0 ? filteredItems.length - 1 : selectedImageIndex - 1
    );
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === filteredItems.length - 1 ? 0 : selectedImageIndex + 1
    );
  };

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-36 bg-[#072C3D] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full bg-ocean/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vw] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4 animate-pulse">
              <span className="w-6 h-[1px] bg-sunset inline-block" />
              <span>THE VISUAL DIARY</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gradient-sand tracking-wide leading-none">
              Captured <span className="text-gradient-sunset">Silence.</span>
            </h2>
            
            <p className="text-white/60 text-sm md:text-base mt-4 font-light">
              High-resolution snapshots from our premium photography tours, backwater expeditions, and romantic sunset couples cruises in Kannur.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3 bg-[#051F2B]/60 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-sunset text-white shadow-lg shadow-sunset/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`break-inside-avoid relative overflow-hidden rounded-2xl shadow-xl border border-white/5 group cursor-pointer ${item.aspect}`}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-75"
                  sizes="(max-w-7xl) 33vw, 100vw"
                />

                {/* Dark and color wash overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-sea/95 via-deep-sea/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Content HUD */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold text-sunset tracking-widest uppercase mb-1 block">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-white/50 tracking-wider">
                      {item.location}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Expand className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX MODAL DRAWER */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#041B26]/98 backdrop-blur-md flex flex-col justify-center items-center p-6"
          >
            {/* Header / close controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
              <div className="flex items-center gap-3 text-xs tracking-widest text-white/50">
                <Camera className="w-4 h-4 text-sunset" />
                <span>
                  IMAGE {selectedImageIndex + 1} OF {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-sunset border border-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Slider container */}
            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
              
              {/* Prev Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 w-12 h-12 rounded-full bg-black/40 hover:bg-sunset flex items-center justify-center border border-white/10 transition-colors text-white z-20 focus:outline-none"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Main Image Viewport */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={filteredItems[selectedImageIndex].image}
                  alt={filteredItems[selectedImageIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 w-12 h-12 rounded-full bg-black/40 hover:bg-sunset flex items-center justify-center border border-white/10 transition-colors text-white z-20 focus:outline-none"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Metadata details */}
            <div className="text-center mt-6 z-10 max-w-lg">
              <span className="text-[10px] font-black text-sunset tracking-[0.2em] uppercase mb-1 block">
                {filteredItems[selectedImageIndex].category}
              </span>
              <h3 className="font-display font-bold text-2xl text-white tracking-wide">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-white/60 text-xs mt-1.5 font-light tracking-wide">
                {filteredItems[selectedImageIndex].location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
