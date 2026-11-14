"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface IndustryImageSliderProps {
  images: { url: string; alt: string; caption?: string }[];
  intervalMs?: number;
  className?: string;
  categoryName?: string;
}

export const IndustryImageSlider: React.FC<IndustryImageSliderProps> = ({
  images,
  intervalMs = 5000,
  className = "",
  categoryName = "Industry Preview",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative w-full h-44 rounded-xl overflow-hidden bg-bg-dark border border-white/10 group-hover:border-brand-accent/30 transition-colors shadow-inner ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Subtle gradient overlay to enhance legibility and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-black/30 z-10" />

          {/* Fallback image with Unsplash optimized CDN URL */}
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center"
            priority={false}
          />

          {/* Category / Snapshot Badge */}
          {images[currentIndex].caption && (
            <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 truncate max-w-[80%]">
                {images[currentIndex].caption}
              </span>
              <span className="font-mono text-[9px] text-white/70 bg-brand-accent/70 px-1.5 py-0.5 rounded">
                {currentIndex + 1}/{images.length}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full border border-white/10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-3 bg-brand-accent" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
