"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryPhotos } from "./PhotoGallery";

interface LightboxModalProps {
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    onNavigate(nextIdx);
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex + 1) % galleryPhotos.length;
    onNavigate(nextIdx);
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || currentIndex === null) return null;

  const currentPhoto = galleryPhotos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Top Close Button & Counter */}
      <div className="absolute top-6 inset-x-6 flex items-center justify-between text-white z-20">
        <div className="bg-[#00383D] text-[#FFDF00] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md">
          {currentIndex + 1} / {galleryPhotos.length}
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-90 active:scale-90 shadow-md"
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image Frame */}
      <div className="relative w-full max-w-5xl h-[60vh] sm:h-[70vh] flex items-center justify-center">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Left Chevron Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFDF00] text-[#00383D] flex items-center justify-center transition-spring hover:scale-110 active:scale-90 shadow-xl cursor-pointer z-20"
        aria-label="Previous photo"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Chevron Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFDF00] text-[#00383D] flex items-center justify-center transition-spring hover:scale-110 active:scale-90 shadow-xl cursor-pointer z-20"
        aria-label="Next photo"
      >
        <ChevronRight size={28} />
      </button>

      {/* Bottom Caption & Thumbnail Strip */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 flex flex-col items-center gap-3 text-center z-20">
        <div className="bg-black/60 backdrop-blur-sm px-6 py-2.5 rounded-full text-white max-w-xl shadow-lg border border-white/10">
          <span className="text-[#FFDF00] text-xs uppercase font-bold mr-2">
            {currentPhoto.category}
          </span>
          <span className="font-['Sedan'] text-base sm:text-lg">
            {currentPhoto.title}
          </span>
        </div>

        {/* Thumbnails row */}
        <div className="hidden sm:flex gap-2">
          {galleryPhotos.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`w-12 h-12 rounded-lg overflow-relative relative border-2 transition-spring cursor-pointer hover:scale-105 active:scale-95 ${
                idx === currentIndex
                  ? "border-[#FFDF00] scale-110 shadow-md ring-2 ring-[#FFDF00]/30"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={thumb.src}
                alt={thumb.title}
                fill
                className="object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

