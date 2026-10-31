"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface PhotoGalleryProps {
  onOpenLightbox: (index: number) => void;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  category: string;
  spanClass: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/gallery_1.png",
    alt: "Artisan Birria & Carnitas Tacos Platter with fresh lime and cilantro",
    title: "Fiesta Feast — Handcrafted Tacos Platter",
    category: "Corporate Buffets",
    spanClass: "lg:col-span-4",
  },
  {
    src: "/images/gallery_2-2b14db.png",
    alt: "Luxury Banquet Buffet Display with roasted proteins and seasonal sides",
    title: "Executive Gala Grand Buffet Display",
    category: "Galas & Summits",
    spanClass: "lg:col-span-3",
  },
  {
    src: "/images/gallery_3.png",
    alt: "Authentic Asian Broth Rice Bowl with poached egg and tender beef",
    title: "Heritage Rice Bowl Station",
    category: "Interactive Stations",
    spanClass: "lg:col-span-2",
  },
  {
    src: "/images/gallery_4.png",
    alt: "Juicy Double Wagyu Cheeseburgers with caramelized onions and brioche",
    title: "Signature Wagyu Sliders & Burgers",
    category: "Late Night Bites",
    spanClass: "lg:col-span-3",
  },
  {
    src: "/images/gallery_5.png",
    alt: "Brioche Fried Egg Avocado Tartine with baby heirloom greens",
    title: "Morning Executive Brunch Open Toast",
    category: "Morning Breakfasts",
    spanClass: "lg:col-span-2",
  },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onOpenLightbox }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 82%",
          once: true,
        },
      });

      // 1. Heading reveal
      tl.fromTo(
        ".gallery-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        }
      )
      // 2. Staggered grid cards entrance
      .fromTo(
        ".gallery-card",
        { y: 35, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.45"
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={galleryRef} id="gallery" className="py-24 sm:py-28 md:py-32 px-6 w-full max-w-full overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Heading */}
        <div className="gallery-heading text-center mb-14 md:mb-16">
          <h2 className="font-['Sedan'] text-[#00383D] text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[1.1] font-normal tracking-[-0.0139em]">
            Photo Gallery
          </h2>
        </div>

        {/* 7-column Grid Layout exactly matching Figma */}
        <div className="gallery-grid-track grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
          {galleryPhotos.map((photo, index) => (
            <div
              key={index}
              className={`gallery-card ${photo.spanClass}`}
            >
              <div
                onClick={() => onOpenLightbox(index)}
                className="relative h-[280px] sm:h-[320px] lg:h-[350px] rounded-[16px] overflow-hidden group cursor-pointer shadow-md transition-spring hover:shadow-2xl hover:-translate-y-2"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-image group-hover:scale-108"
                />

                {/* Hover Dark Vignette & Lightbox Icon */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="self-end">
                    <span className="w-10 h-10 rounded-full bg-[#FFDF00] text-[#00383D] flex items-center justify-center shadow-lg transition-spring group-hover:scale-110 group-hover:rotate-12 active:scale-90">
                      <Maximize2 size={18} />
                    </span>
                  </div>
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#FFDF00] bg-[#00383D]/80 px-2.5 py-1 rounded-md inline-block mb-1 shadow-sm">
                      {photo.category}
                    </span>
                    <h4 className="font-['Sedan'] text-white text-xl">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
